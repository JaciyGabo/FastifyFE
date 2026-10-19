# Fastify.IO — Frontend

Interfaz en React 19 + TypeScript + Vite + Tailwind CSS v4 para el backend Fastify (JWT + MySQL).

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173 (proxy a la API en http://127.0.0.1:3000)
npm run build    # typecheck + build de producción
npm run lint
```

El backend debe estar en ejecución en el puerto 3000. Vite reenvía `/auth`, `/users`, `/health` y `/docs` a la API.

## Estructura

- `src/api/client.ts`: cliente HTTP, renovación automática del access token y mensajes de error en español.
- `src/context/`: sesión (`AuthContext`) y tema claro/oscuro (`ThemeContext`).
- `src/components/`: piezas reutilizables (botón, campo, alerta, layout de autenticación).
- `src/pages/`: login, registro y panel de control.

## Paleta

| Token | Color | Uso |
| --- | --- | --- |
| `teal` | `#62A8AC` | Acción principal y acentos |
| `petal` | `#DC6BAD` | Errores y acciones de salida |
| `bronze` | `#DFA06E` | Indicadores secundarios |
| `chiffon` | `#F5F3BB` | Reservado para acentos suaves |

Los tokens neutros (`canvas`, `surface`, `line`, `fg`, `muted`) están definidos en `src/index.css` y cambian con el tema.
