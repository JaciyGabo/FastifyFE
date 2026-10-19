import { useState } from 'react';
import { ExternalLink, LogOut, Menu, X, Shield, Sparkles, Server } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/85 transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal via-petal to-bronze text-white shadow-md shadow-petal/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Fastify<span className="text-teal">.IO</span>
              </h1>
              <span className="hidden sm:inline-flex rounded-md bg-teal/10 px-2 py-0.5 text-[10px] font-bold text-teal uppercase tracking-wider">
                PROD
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden xs:block">
              Arquitectura Segura + MySQL
            </p>
          </div>
        </div>

        {/* Desktop Controls (hidden on mobile, visible from md up) */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="http://localhost:3000/docs"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:border-teal hover:text-teal dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-teal transition-all"
          >
            <Server className="h-3.5 w-3.5 text-teal" />
            <span>Swagger API Docs</span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </a>

          {/* User Email & Role Pill */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3.5 py-1.5 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-medium max-w-[160px] truncate">{user?.email}</span>
            <span className="inline-flex items-center gap-1 rounded-md bg-petal/10 px-1.5 py-0.5 text-[10px] font-bold text-petal-dark dark:text-petal-light uppercase">
              <Shield className="h-2.5 w-2.5" />
              {user?.role}
            </span>
          </div>

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Logout Button */}
          <button
            onClick={() => logout()}
            className="flex items-center gap-1.5 rounded-xl border border-petal/30 bg-petal/5 px-3.5 py-2 text-xs font-bold text-petal-dark hover:bg-petal hover:text-white dark:border-petal/40 dark:text-petal-light dark:hover:bg-petal dark:hover:text-white transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Cerrar sesión</span>
          </button>
        </div>

        {/* Mobile Action Bar (ThemeToggle + Hamburger menu button) */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-teal dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-petal" /> : <Menu className="h-5 w-5 text-teal" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Collapsible Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 px-4 pt-3 pb-5 shadow-xl backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/95 space-y-3 animate-fade-in">
          {/* User info box in mobile */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950/80">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {user?.email}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  ID: {user?.id}
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-md bg-petal/10 px-2 py-0.5 text-[10px] font-bold text-petal-dark dark:text-petal-light uppercase shrink-0">
              <Shield className="h-3 w-3" />
              {user?.role}
            </span>
          </div>

          {/* Swagger Link */}
          <a
            href="http://localhost:3000/docs"
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:border-teal hover:text-teal dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-teal" />
              <span>Explorar Swagger API Docs</span>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
          </a>

          {/* Logout Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              logout();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-petal/10 py-2.5 text-xs font-bold text-petal-dark hover:bg-petal hover:text-white dark:bg-petal/20 dark:text-petal-light transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      )}
    </header>
  );
}
