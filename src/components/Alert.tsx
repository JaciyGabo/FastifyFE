import type { ReactNode } from 'react';

export function Alert({ children }: { children: ReactNode }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-petal/40 bg-petal/10 px-4 py-3 text-sm font-medium text-petal-deep dark:text-petal"
    >
      {children}
    </div>
  );
}
