import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from '../components/ThemeToggle';

const loginSchema = z.object({
  email: z.string().email('Ingresa un correo electrónico válido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError(null);
      await login(data);
      navigate('/dashboard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setServerError(msg);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 px-4 py-12 transition-colors duration-300">
      {/* 60% Ambient Background Canvas with 30% Teal & Chiffon Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-teal/20 blur-3xl filter dark:bg-teal/15 animate-pulse" />
        <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-chiffon/40 blur-3xl filter dark:bg-petal/15" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-bronze/25 blur-3xl filter dark:bg-bronze/15" />
      </div>

      {/* Floating Theme Switcher at Top Right */}
      <div className="absolute top-5 right-5 z-20">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card Container */}
        <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-2xl shadow-teal/10 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/85 dark:shadow-black/40">
          {/* Header Brand */}
          <div className="text-center mb-8">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1 text-xs font-semibold text-teal-dark dark:text-teal mb-4 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-petal" />
              <span>Fastify Cloud Architecture</span>
            </div>

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal via-petal to-bronze text-white shadow-lg shadow-petal/30">
              <LogIn className="h-7 w-7" />
            </div>

            <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Iniciar Sesión
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Acceso seguro con autenticación JWT y MySQL
            </p>
          </div>

          {/* Server Error Alert */}
          {serverError && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-petal/30 bg-petal/10 p-4 text-sm text-petal-dark dark:text-petal-light animate-fade-in">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-petal" />
              <span className="font-medium">{serverError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                <input
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  placeholder="admin@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-all outline-none focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/15 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white dark:placeholder-slate-600 dark:focus:border-teal dark:focus:bg-slate-950 dark:focus:ring-teal/20"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs font-semibold text-petal-dark dark:text-petal-light">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
                <input
                  {...register('password')}
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-all outline-none focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/15 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white dark:placeholder-slate-600 dark:focus:border-teal dark:focus:bg-slate-950 dark:focus:ring-teal/20"
                />
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs font-semibold text-petal-dark dark:text-petal-light">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* 10% Bold Accent Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-teal via-petal to-bronze p-[1px] font-semibold text-white shadow-lg shadow-petal/25 transition-all duration-300 hover:shadow-xl hover:shadow-petal/35 hover:brightness-105 active:scale-[0.99] disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
            >
              <span className="flex h-full w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-petal via-petal-dark to-bronze py-3 text-sm font-bold tracking-wide transition-all group-hover:bg-opacity-90">
                {isSubmitting ? (
                  'Validando credenciales...'
                ) : (
                  <>
                    <span>Entrar a la Plataforma</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            ¿No tienes una cuenta aún?{' '}
            <Link
              to="/register"
              className="font-bold text-teal hover:text-teal-dark dark:hover:text-teal-light underline underline-offset-4 transition"
            >
              Crear cuenta nueva
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
