export function PageLoader() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-canvas">
      <span
        role="status"
        aria-label="Cargando"
        className="h-8 w-8 animate-spin rounded-full border-[3px] border-line border-t-teal"
      />
    </div>
  );
}
