import { useId, useState, type InputHTMLAttributes, type Ref } from 'react';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  ref?: Ref<HTMLInputElement>;
}

export function Field({ label, error, hint, type = 'text', id, ref, ...inputProps }: FieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-sm font-medium text-fg">
        {label}
      </label>

      <div className="relative">
        <input
          {...inputProps}
          id={inputId}
          ref={ref}
          type={isPassword && showPassword ? 'text' : type}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`h-11 w-full rounded-xl border bg-canvas px-3.5 text-[15px] text-fg outline-none transition placeholder:text-muted/70 focus:bg-surface focus:ring-4 ${
            error
              ? 'border-petal focus:ring-petal/20'
              : 'border-control focus:border-teal focus:ring-teal/20'
          } ${isPassword ? 'pr-20' : ''}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg px-2.5 py-1 text-xs font-semibold text-muted transition hover:text-fg"
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        )}
      </div>

      {error ? (
        <p id={`${inputId}-error`} role="alert" className="text-xs font-medium text-petal-deep dark:text-petal">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
