import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
      title={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
      className={`group relative flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-petal/50 ${
        isDark
          ? 'border-slate-700 bg-slate-800/80 text-chiffon shadow-sm hover:border-teal/60 hover:bg-slate-800'
          : 'border-slate-200 bg-white/90 text-slate-700 shadow-sm hover:border-teal/60 hover:bg-slate-50'
      } ${className}`}
    >
      <div className="relative h-4 w-4">
        <Sun
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 transform ${
            isDark
              ? 'scale-0 rotate-90 opacity-0 text-chiffon'
              : 'scale-100 rotate-0 opacity-100 text-bronze'
          }`}
        />
        <Moon
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 transform ${
            isDark
              ? 'scale-100 rotate-0 opacity-100 text-teal'
              : 'scale-0 -rotate-90 opacity-0 text-slate-400'
          }`}
        />
      </div>
      <span className="sr-only">Cambiar tema</span>
    </button>
  );
}
