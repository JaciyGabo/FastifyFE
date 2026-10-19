import { useState, type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Navbar } from '../components/Navbar';

const REFRESH_MS = 15_000;

function formatUptime(totalSeconds: number): string {
  const s = Math.floor(totalSeconds);
  const days = Math.floor(s / 86_400);
  const hours = Math.floor((s % 86_400) / 3_600);
  const minutes = Math.floor((s % 3_600) / 60);

  if (days > 0) return `${days} d ${hours} h`;
  if (hours > 0) return `${hours} h ${minutes} min`;
  if (minutes > 0) return `${minutes} min`;
  return `${s} s`;
}

function StatCard({ label, value, detail }: { label: string; value: ReactNode; detail: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <p className="text-sm font-medium text-muted">{label}</p>
      <div className="mt-2 text-xl font-semibold tracking-tight">{value}</div>
      <p className="mt-1 text-xs text-muted">{detail}</p>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-3.5 last:border-b-0">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-right text-sm font-medium">{children}</dd>
    </div>
  );
}

export function Dashboard() {
  const { user } = useAuth();
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');

  const health = useQuery({
    queryKey: ['health'],
    queryFn: () => api.getHealth(),
    refetchInterval: REFRESH_MS,
    retry: false,
  });

  const isDown = health.isError;
  const isUp = health.isSuccess;

  const statusText = isUp ? 'Operativa' : isDown ? 'No disponible' : 'Comprobando…';
  const dbText = isUp ? 'Conectada' : isDown ? 'Sin conexión' : 'Comprobando…';
  const statusDot = isUp ? 'bg-teal' : isDown ? 'bg-petal' : 'bg-muted/40';

  const copyId = async () => {
    if (!user) return;
    try {
      await navigator.clipboard.writeText(String(user.id));
      setCopyState('copied');
    } catch {
      // El navegador puede bloquear el portapapeles (permisos o contexto no seguro).
      setCopyState('error');
    }
    window.setTimeout(() => setCopyState('idle'), 2000);
  };

  return (
    <div className="min-h-dvh bg-canvas">
      <Navbar />

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 sm:py-10">
        <section>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Panel de control</h1>
          <p className="mt-1 break-all text-sm text-muted">Sesión iniciada como {user?.email}</p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Estado de la API"
            value={
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${statusDot}`} />
                {statusText}
              </span>
            }
            detail="Ruta /health/ready"
          />
          <StatCard label="Base de datos" value={dbText} detail="MySQL, consulta de prueba" />
          <StatCard
            label="Tiempo activo"
            value={health.data ? formatUptime(health.data.uptime) : '—'}
            detail="Desde el último arranque"
          />
          <StatCard
            label="Última comprobación"
            value={
              health.dataUpdatedAt
                ? new Date(health.dataUpdatedAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })
                : '—'
            }
            detail={`Se actualiza cada ${REFRESH_MS / 1000} s`}
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="text-base font-semibold">Tu cuenta</h2>

            <dl className="mt-4">
              <Row label="ID de usuario">
                <span className="inline-flex items-center gap-3">
                  <span className="font-mono">{user?.id}</span>
                  <Button variant="secondary" size="sm" onClick={copyId}>
                    {copyState === 'copied'
                      ? 'Copiado'
                      : copyState === 'error'
                        ? 'Error al copiar'
                        : 'Copiar'}
                  </Button>
                </span>
              </Row>
              <Row label="Correo">
                <span className="break-all">{user?.email}</span>
              </Row>
              <Row label="Rol">{user?.role === 'admin' ? 'Administrador' : 'Usuario'}</Row>
              <Row label="Sesión">Activa</Row>
            </dl>
          </div>

          <div className="flex flex-col rounded-2xl border border-line bg-surface p-6">
            <h2 className="text-base font-semibold">Servidor</h2>
            <p className="mt-1 text-sm text-muted">
              {isDown
                ? 'No fue posible contactar con la API. Revisa que el backend esté en ejecución.'
                : 'Comprueba el estado del backend o consulta la documentación de la API.'}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-auto">
              <Button
                variant="primary"
                onClick={() => health.refetch()}
                disabled={health.isFetching}
                className="sm:flex-1"
              >
                {health.isFetching ? 'Actualizando…' : 'Actualizar estado'}
              </Button>
              <a
                href="/docs"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-line bg-surface px-5 text-sm font-semibold transition hover:bg-canvas sm:flex-1"
              >
                Documentación API
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
