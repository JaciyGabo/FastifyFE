interface BrandProps {
  /** `onAccent` se usa sobre fondos de color (p. ej. el panel teal del login). */
  tone?: 'default' | 'onAccent';
  className?: string;
}

export function Brand({ tone = 'default', className = '' }: BrandProps) {
  const onAccent = tone === 'onAccent';

  return (
    <span
      className={`text-base font-bold tracking-tight ${onAccent ? 'text-ink' : 'text-fg'} ${className}`}
    >
      Fastify
      <span className={onAccent ? 'text-ink/60' : 'text-teal-deep dark:text-teal'}>.IO</span>
    </span>
  );
}
