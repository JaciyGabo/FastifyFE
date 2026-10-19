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
  status: string;
  uptime: number;
  timestamp: string;
  database?: string;
}

class ApiClient {
  private accessToken: string | null = null;
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  private onRefreshed(token: string) {
    this.refreshSubscribers.forEach((cb) => cb(token));
    this.refreshSubscribers = [];
  }

  private subscribeTokenRefresh(cb: (token: string) => void) {
    this.refreshSubscribers.push(cb);
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
      credentials: 'include', // send httpOnly cookies (refreshToken)
    };

    let response = await fetch(endpoint, config);

    // If unauthorized and we weren't trying to login or refresh
    if (response.status === 401 && !endpoint.startsWith('/auth/login') && !endpoint.startsWith('/auth/refresh')) {
      if (!this.isRefreshing) {
        this.isRefreshing = true;

        try {
          const refreshRes = await this.refreshToken();
          this.setAccessToken(refreshRes.accessToken);
          this.isRefreshing = false;
          this.onRefreshed(refreshRes.accessToken);
        } catch (err) {
          this.isRefreshing = false;
          this.setAccessToken(null);
          this.refreshSubscribers = [];
          throw err;
        }
      }

      // Wait for refresh to complete and retry original request
      const retryToken = await new Promise<string>((resolve) => {
        this.subscribeTokenRefresh((token) => resolve(token));
      });

      headers.Authorization = `Bearer ${retryToken}`;
      response = await fetch(endpoint, { ...config, headers });
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.message || `Request failed with status ${response.status}`;
      const err = new Error(message);
      (err as unknown as { status: number; data: unknown }).status = response.status;
      (err as unknown as { status: number; data: unknown }).data = errorData;
      throw err;
    }

    return response.json();
  }

  async register(data: { email: string; password: string; role?: 'user' | 'admin' }): Promise<AuthResponse> {
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

  async refreshToken(): Promise<AuthResponse> {
    return fetch('/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error('Refresh failed');
      }
      return res.json();
    });
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
