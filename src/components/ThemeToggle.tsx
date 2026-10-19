import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-3.5 text-xs font-semibold text-muted transition hover:text-fg"
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${isDark ? 'bg-teal' : 'bg-bronze'}`}
      />
      {isDark ? 'Modo claro' : 'Modo oscuro'}
    </button>
  );
}
