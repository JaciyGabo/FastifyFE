import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'danger';
type Size = 'md' | 'sm';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary: 'bg-teal text-ink hover:bg-[#55989c]',
  secondary: 'border border-control bg-surface text-fg hover:bg-canvas',
  danger: 'bg-petal text-ink hover:bg-[#d95ea6]',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  sm: 'h-9 px-3.5 text-xs',
};

export function Button({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-semibold transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
    />
  );
}
