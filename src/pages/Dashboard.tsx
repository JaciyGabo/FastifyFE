import { useQuery } from '@tanstack/react-query';
import { LogOut, User as UserIcon, Shield, Database, Activity, ExternalLink, RefreshCw } from 'lucide-react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export function Dashboard() {
  const { user, logout } = useAuth();

  const {
    data: health,
    isLoading: healthLoading,
    refetch: refetchHealth,
    isRefetching,
  } = useQuery({
    queryKey: ['health'],
    queryFn: () => api.getHealth(),
    refetchInterval: 10000,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navbar */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-lg shadow-sm">
              F
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">Fastify App</h1>
              <p className="text-xs text-slate-500">React + Vite + TypeScript</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="http://localhost:3000/docs"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
              API Docs (Swagger)
            </a>

            <div className="flex items-center gap-2 rounded-full bg-slate-100 py-1 px-3 text-xs font-medium text-slate-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              {user?.email}
            </div>

            <button
              onClick={() => logout()}
              className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Panel de Control</h2>
          <p className="text-sm text-slate-500">
            Sesión activa verificada mediante Access Token JWT y rotación de Refresh Tokens.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* User Profile Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <UserIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Perfil de Usuario</h3>
                  <p className="text-xs text-slate-500">Información sincronizada con MySQL</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                <Shield className="h-3 w-3" />
                {user?.role}
              </span>
            </div>

            <dl className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-50">
                <dt className="text-slate-500 font-medium">ID de Usuario:</dt>
                <dd className="font-mono text-slate-900 font-semibold">{user?.id}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <dt className="text-slate-500 font-medium">Correo Electrónico:</dt>
                <dd className="font-medium text-slate-900">{user?.email}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <dt className="text-slate-500 font-medium">Rol Asignado:</dt>
                <dd className="capitalize text-slate-900 font-medium">{user?.role}</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="text-slate-500 font-medium">Autenticación:</dt>
                <dd className="text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  JWT Bearer Activo
                </dd>
              </div>
            </dl>
          </div>

          {/* Backend & Database Health Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Estado del Sistema Backend</h3>
                  <p className="text-xs text-slate-500">Consulta en vivo a /health/ready</p>
                </div>
              </div>
              <button
                onClick={() => refetchHealth()}
                disabled={isRefetching}
                className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition"
              >
                <RefreshCw className={`h-3 w-3 ${isRefetching ? 'animate-spin' : ''}`} />
                Recargar
              </button>
            </div>

            {healthLoading ? (
              <div className="flex h-36 items-center justify-center text-slate-400 text-sm">
                Consultando estado del servidor...
              </div>
            ) : (
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <dt className="text-slate-500 font-medium">Estado de la API:</dt>
                  <dd className="font-semibold text-emerald-600 uppercase flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    {health?.status || 'Online'}
                  </dd>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <dt className="text-slate-500 font-medium flex items-center gap-1.5">
                    <Database className="h-4 w-4 text-slate-400" />
                    Base de Datos (MySQL):
                  </dt>
                  <dd className="font-medium text-emerald-600 capitalize">
                    {health?.database || 'Conectada'}
                  </dd>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <dt className="text-slate-500 font-medium">Uptime del Servidor:</dt>
                  <dd className="font-mono text-slate-900">
                    {health?.uptime ? `${Math.floor(health.uptime)} segundos` : 'N/A'}
                  </dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-slate-500 font-medium">Última Comprobación:</dt>
                  <dd className="text-xs text-slate-500 font-mono">
                    {health?.timestamp ? new Date(health.timestamp).toLocaleTimeString() : 'N/A'}
                  </dd>
                </div>
              </dl>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
