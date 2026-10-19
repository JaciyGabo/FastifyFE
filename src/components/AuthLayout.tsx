import type { ReactNode } from 'react';
import { Brand } from './Brand';
import { ThemeToggle } from './ThemeToggle';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  footer: ReactNode;
  children: ReactNode;
}

const STACK = ['Fastify 5', 'JWT', 'Argon2', 'MySQL'];

export function AuthLayout({ title, subtitle, footer, children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      <aside className="hidden flex-col justify-between bg-teal p-12 text-ink lg:flex">
        <Brand tone="onAccent" />

        <div className="max-w-md">
          <h2 className="text-4xl font-bold leading-tight tracking-tight">
            Acceso seguro a tu plataforma.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/75">
            Autenticación con tokens de acceso y sesiones renovables, respaldada por una base de
            datos relacional.
          </p>
        </div>

        <ul className="flex flex-wrap gap-2">
          {STACK.map((item) => (
            <li
              key={item}
              className="rounded-full border border-ink/20 px-3 py-1 text-xs font-semibold"
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex flex-col px-5 py-6 sm:px-10">
        <header className="flex items-center justify-between">
          <Brand className="lg:invisible" />
          <ThemeToggle />
        </header>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <p className="mt-1.5 text-sm text-muted">{subtitle}</p>

            <div className="mt-8">{children}</div>

            <div className="mt-8 border-t border-line pt-6 text-center text-sm text-muted">
              {footer}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
