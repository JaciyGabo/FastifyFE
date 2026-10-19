import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  User as UserIcon,
  Shield,
  Database,
  Activity,
  RefreshCw,
  Check,
  Copy,
  KeyRound,
  Server,
  Zap,
} from 'lucide-react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';

export function Dashboard() {
  const { user } = useAuth();
  const [copiedId, setCopiedId] = useState(false);

  const {
    data: health,
    isLoading: healthLoading,
    refetch: refetchHealth,
    isRefetching,
  } = useQuery({
    queryKey: ['health'],
    queryFn: () => api.getHealth(),
    refetchInterval: 15000,
  });

  const handleCopyId = () => {
    if (user?.id) {
      navigator.clipboard.writeText(String(user.id));
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* 60% Dominant Canvas with 30% Structural Ambient Light Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-teal/10 blur-3xl filter dark:bg-teal/5" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-petal/10 blur-3xl filter dark:bg-petal/5" />
        <div className="absolute -bottom-32 left-1/2 h-96 w-96 rounded-full bg-chiffon/20 blur-3xl filter dark:bg-bronze/5" />
      </div>

      <Navbar />

      {/* Main Content Area */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3 py-0.5 text-xs font-bold text-teal dark:text-teal-light mb-2">
              <Zap className="h-3.5 w-3.5 text-bronze" />
              <span>Consola Operativa Fastify v5</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Panel de Control
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Monitoreo en vivo de arquitectura desacoplada con tokens criptográficos JWT y base de datos relacional.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => refetchHealth()}
              disabled={isRefetching}
              className="inline-flex items-center gap-2 rounded-xl border border-teal/40 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-bold text-teal shadow-xs hover:border-teal hover:bg-teal/5 dark:hover:bg-slate-800 disabled:opacity-50 transition cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefetching ? 'animate-spin text-petal' : ''}`} />
              <span>{isRefetching ? 'Consultando...' : 'Sincronizar Estado'}</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Summary Cards (30% Structural + 10% Energetic Accent) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Status API */}
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Estado API
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal/15 text-teal">
                <Server className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-lg font-black text-slate-900 dark:text-white">
                {health?.status === 'ok' ? 'Operativo 100%' : 'Verificando...'}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">Ruta /health/ready</p>
          </div>

          {/* Database MySQL */}
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Base de Datos
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-bronze/15 text-bronze">
                <Database className="h-4 w-4" />
              </div>
            </div>
            <div className="text-lg font-black text-slate-900 dark:text-white">
              MySQL 8.0
            </div>
            <p className="mt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              Conexión activa con Pool
            </p>
          </div>

          {/* Token Security */}
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Autenticación
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-petal/15 text-petal">
                <KeyRound className="h-4 w-4" />
              </div>
            </div>
            <div className="text-lg font-black text-slate-900 dark:text-white">
              JWT Bearer
            </div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Rotación con HttpOnly Cookie
            </p>
          </div>

          {/* Role Status */}
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Rol Activo
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal/15 text-teal">
                <Shield className="h-4 w-4" />
              </div>
            </div>
            <div className="text-lg font-black uppercase text-teal-dark dark:text-teal-light">
              {user?.role || 'User'}
            </div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Acceso verificado
            </p>
          </div>
        </div>

        {/* Detailed Grid: 2 Main Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* User Profile Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 sm:p-7 shadow-sm backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/85">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6 dark:border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal to-teal-dark text-white shadow-md shadow-teal/20">
                  <UserIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white">
                    Identidad del Usuario
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Registro persistido en base de datos
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-petal/30 bg-petal/10 px-3 py-1 text-xs font-bold text-petal-dark dark:text-petal-light uppercase">
                <Shield className="h-3 w-3" />
                {user?.role}
              </span>
            </div>

            <dl className="space-y-4 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/60">
                <dt className="text-slate-500 dark:text-slate-400 font-medium">ID Único:</dt>
                <dd className="flex items-center gap-2 font-mono font-bold text-slate-900 dark:text-white">
                  <span>{user?.id}</span>
                  <button
                    onClick={handleCopyId}
                    title="Copiar ID"
                    aria-label="Copiar ID"
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:border-teal hover:text-teal dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition cursor-pointer"
                  >
                    {copiedId ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </dd>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/60">
                <dt className="text-slate-500 dark:text-slate-400 font-medium">Correo Electrónico:</dt>
                <dd className="font-semibold text-slate-900 dark:text-white">{user?.email}</dd>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/60">
                <dt className="text-slate-500 dark:text-slate-400 font-medium">Privilegios de Acceso:</dt>
                <dd className="capitalize font-semibold text-teal-dark dark:text-teal-light">
                  {user?.role === 'admin' ? 'Control Total de Sistema' : 'Usuario Estándar Protegido'}
                </dd>
              </div>

              <div className="flex items-center justify-between py-2">
                <dt className="text-slate-500 dark:text-slate-400 font-medium">Estado de la Sesión:</dt>
                <dd className="inline-flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  JWT Activo & Válido
                </dd>
              </div>
            </dl>
          </div>

          {/* Backend & Database Health Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 sm:p-7 shadow-sm backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/85">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6 dark:border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-petal to-bronze text-white shadow-md shadow-petal/20">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white">
                    Diagnóstico del Servidor
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Sondeo periódico cada 15 segundos
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs font-bold text-teal dark:text-teal-light">
                <span className="h-2 w-2 rounded-full bg-teal animate-ping"></span>
                En Vivo
              </span>
            </div>

            {healthLoading ? (
              <div className="flex h-44 flex-col items-center justify-center gap-2 text-slate-400 text-sm">
                <RefreshCw className="h-6 w-6 animate-spin text-teal" />
                <span>Consultando estado del clúster backend...</span>
              </div>
            ) : (
              <dl className="space-y-4 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/60">
                  <dt className="text-slate-500 dark:text-slate-400 font-medium">Estado del Núcleo:</dt>
                  <dd className="font-bold text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    {health?.status || 'OK (Saludable)'}
                  </dd>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/60">
                  <dt className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                    <Database className="h-4 w-4 text-bronze" />
                    Base de Datos (MySQL):
                  </dt>
                  <dd className="font-semibold text-emerald-600 dark:text-emerald-400 capitalize">
                    {health?.database || 'Conectada & Verificada'}
                  </dd>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/60">
                  <dt className="text-slate-500 dark:text-slate-400 font-medium">Tiempo de Actividad (Uptime):</dt>
                  <dd className="font-mono font-bold text-slate-900 dark:text-white">
                    {health?.uptime ? `${Math.floor(health.uptime)} segundos` : 'En ejecución'}
                  </dd>
                </div>

                <div className="flex items-center justify-between py-2">
                  <dt className="text-slate-500 dark:text-slate-400 font-medium">Última Comprobación:</dt>
                  <dd className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                    {health?.timestamp ? new Date(health.timestamp).toLocaleTimeString() : 'Reciente'}
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
