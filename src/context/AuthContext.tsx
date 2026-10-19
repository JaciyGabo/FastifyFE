import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, type ApiUser } from '../api/client';

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextType {
  user: ApiUser | null;
  isLoading: boolean;
  login: (data: Credentials) => Promise<void>;
  register: (data: Credentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Si la sesión caduca mientras se usa la app, volvemos al login.
    api.onSessionExpired = () => setUser(null);

    // Restaura la sesión al cargar la página usando la cookie de refresh.
    api
      .refreshToken()
      .then((res) => {
        api.setAccessToken(res.accessToken);
        setUser(res.user);
      })
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));

    return () => {
      api.onSessionExpired = null;
    };
  }, []);

  const login = async (data: Credentials) => {
    const res = await api.login(data);
    setUser(res.user);
  };

  const register = async (data: Credentials) => {
    const res = await api.register(data);
    setUser(res.user);
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch {
      // Si el servidor no responde, igualmente cerramos la sesión local.
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
