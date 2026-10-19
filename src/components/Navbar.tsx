import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Brand } from './Brand';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const { logout } = useAuth();
  const [isLeaving, setIsLeaving] = useState(false);

  const handleLogout = async () => {
    setIsLeaving(true);
    // logout() nunca lanza: si el servidor falla, la sesión local se cierra igualmente.
    await logout();
  };

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Brand />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="secondary" size="sm" onClick={handleLogout} disabled={isLeaving}>
            {isLeaving ? 'Saliendo…' : 'Cerrar sesión'}
          </Button>
        </div>
      </div>
    </header>
  );
}
