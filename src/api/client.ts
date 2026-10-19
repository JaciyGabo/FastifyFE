export interface ApiUser {
  id: number;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: ApiUser;
  accessToken: string;
}

export interface HealthResponse {
  status: 'ok';
  uptime: number;
  timestamp: string;
  database: 'connected';
}

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(message: string, status: number, code: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

const AUTH_PATHS = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout'];

const MESSAGES_BY_CODE: Record<string, string> = {
  INVALID_CREDENTIALS: 'Correo o contraseña incorrectos.',
  EMAIL_ALREADY_EXISTS: 'Ya existe una cuenta con ese correo.',
  VALIDATION_ERROR: 'Revisa los datos ingresados.',
  TOO_MANY_REQUESTS: 'Demasiados intentos. Espera un momento e inténtalo de nuevo.',
};

/** Convierte cualquier error de la API o de red en un mensaje listo para mostrar. */
export function getErrorMessage(err: unknown, fallback = 'Ocurrió un error inesperado.'): string {
  if (err instanceof ApiError) {
    if (MESSAGES_BY_CODE[err.code]) return MESSAGES_BY_CODE[err.code];
    if (err.status >= 500) return 'El servidor no está disponible. Inténtalo más tarde.';
    return err.message || fallback;
  }
  if (err instanceof TypeError) {
    return 'No se pudo conectar con el servidor.';
  }
  return fallback;
}

class ApiClient {
  private accessToken: string | null = null;
  private refreshInFlight: Promise<string> | null = null;

  /** Se invoca cuando la sesión deja de ser válida (el refresh también falló). */
  onSessionExpired: (() => void) | null = null;

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  private async send(endpoint: string, init: RequestInit): Promise<Response> {
    const headers = new Headers(init.headers);
    // Solo se envía Content-Type cuando hay body: Fastify rechaza un JSON vacío.
    if (init.body !== undefined) {
      headers.set('Content-Type', 'application/json');
    }
    if (this.accessToken) {
      headers.set('Authorization', `Bearer ${this.accessToken}`);
    }
    // credentials: 'include' permite que el navegador envíe la cookie httpOnly del refresh token.
    return fetch(endpoint, { ...init, headers, credentials: 'include' });
  }

  /** Renueva el access token. Varias peticiones 401 simultáneas comparten la misma renovación. */
  private refreshSession(): Promise<string> {
    if (!this.refreshInFlight) {
      this.refreshInFlight = this.refreshToken()
        .then((res) => {
          this.setAccessToken(res.accessToken);
          return res.accessToken;
        })
        .catch((err: unknown) => {
          this.setAccessToken(null);
          this.onSessionExpired?.();
          throw err;
        })
        .finally(() => {
          this.refreshInFlight = null;
        });
    }
    return this.refreshInFlight;
  }

  async request<T>(endpoint: string, init: RequestInit = {}): Promise<T> {
    let response = await this.send(endpoint, init);

    const isAuthCall = AUTH_PATHS.some((path) => endpoint.startsWith(path));
    if (response.status === 401 && !isAuthCall) {
      await this.refreshSession();
      response = await this.send(endpoint, init);
    }

    if (!response.ok) {
      const body = (await response.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
      };
      throw new ApiError(
        body.message ?? `Request failed with status ${response.status}`,
        response.status,
        body.error ?? 'UNKNOWN',
      );
    }

    return response.json() as Promise<T>;
  }

  async register(data: { email: string; password: string }): Promise<AuthResponse> {
    const res = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    this.setAccessToken(res.accessToken);
    return res;
  }

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    const res = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    this.setAccessToken(res.accessToken);
    return res;
  }

  /** Llamada directa (sin reintento) usada para restaurar la sesión al cargar la app. */
  async refreshToken(): Promise<AuthResponse> {
    const res = await fetch('/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) {
      throw new ApiError('Refresh failed', res.status, 'REFRESH_FAILED');
    }
    return res.json() as Promise<AuthResponse>;
  }

  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.setAccessToken(null);
    }
  }

  async getMe(): Promise<{ user: ApiUser }> {
    return this.request<{ user: ApiUser }>('/users/me');
  }

  async getHealth(): Promise<HealthResponse> {
    return this.request<HealthResponse>('/health/ready');
  }
}

export const api = new ApiClient();
