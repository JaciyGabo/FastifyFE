import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, type ApiUser } from '../api/client';

interface AuthContextType {
  user: ApiUser | null;
  isLoading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: { email: string; password: string; role?: 'user' | 'admin' }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Attempt silent session restore on app load
    api
      .refreshToken()
      .then((res) => {
        api.setAccessToken(res.accessToken);
        setUser(res.user);
      })
      .catch(() => {
        // No active session or expired
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = async (data: { email: string; password: string }) => {
    const res = await api.login(data);
    setUser(res.user);
  };

  const register = async (data: { email: string; password: string; role?: 'user' | 'admin' }) => {
    const res = await api.register(data);
    setUser(res.user);
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
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
