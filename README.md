# Fastify Frontend - Consola Operativa

Interfaz de usuario moderna, reactiva y segura construida con React 19, TypeScript, Vite y Tailwind CSS v4, conectada a la API backend Fastify v5 con persistencia MySQL.

---

## 🎨 Sistema de Diseño (Regla 60-30-10)

La interfaz implementa estrictamente una paleta viva y audaz bajo la regla 60-30-10:

- **60% Dominante / Canvas Base:** Fondos neutros y limpios (`#F8FAFC` en Light Mode / `#020617` en Dark Mode), tarjetas translúcidas de cristal con desenfoque de fondo (`backdrop-blur-xl`).
- **30% Estructural / Identidad de Marca:**
  - **Tropical Teal (`#62A8AC`):** Encabezados, bordes interactivos, barras de navegación, indicadores de estado de red.
  - **Lemon Chiffon (`#F5F3BB`):** Resplandores ambientales y cápsulas de realce.
- **10% Acento Energético:**
  - **Petal Pink (`#DC6BAD`):** Botones de acción principal (CTA), anillos de enfoque, insignias de rol.
  - **Light Bronze (`#DFA06E`):** Destacados de métricas, destellos y estados activos.

---

## 🛡️ Seguridad End-to-End

- **Restricción de Rol en Registro:** Se eliminó la selección de roles del lado del cliente para evitar escalamiento de privilegios. Todos los registros asignan de forma predeterminada el rol seguro `user` desde el servidor.
- **Autenticación JWT:** Tokens de acceso (JWT Bearer) en memoria de la aplicación y tokens de actualización (Refresh Tokens) transmitidos mediante cookies `httpOnly` seguras.
- **Rotación de Sesiones:** El cliente API detecta errores 401 y rota la sesión automáticamente en segundo plano.

---

## 🌓 Modo Oscuro / Claro

- Soporte nativo para modo oscuro persistido en `localStorage` con autodetección de preferencia de sistema (`prefers-color-scheme`).
- Componente `ThemeToggle` con animaciones fluidas disponible en barra de navegación y vistas de autenticación.

---

## 📱 Responsividad y Navegación

- Barra de navegación fluida que adapta sus controles dinámicamente.
- Menú hamburguesa colapsable en pantallas pequeñas (`< 768px`) para evitar compresión de elementos visuales.

---

## 🚀 Comandos

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción (TypeScript + Vite)
npm run build

# Ejecutar linter
npm run lint
```
