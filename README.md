# CuraModa

Una tienda online moderna de ropa y accesorios desarrollada con React, TypeScript y Vite.

## 🚀 Instalación

Cloná el repo y seguí estos pasos para arrancar:

```bash
# Instalar dependencias
npm install

# Crear archivo .env a partir del ejemplo
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

El servidor arrancará en http://localhost:5173

## ⚙️ Configuración

El proyecto usa variables de entorno para configurar la API. Asegurate de tener un archivo `.env` con:

```
VITE_API_BASE_URL=https://api-frontend-production.up.railway.app/api/products
```

## 📦 Scripts disponibles

```bash
# Desarrollo
npm run dev           # Inicia servidor de desarrollo

# Producción
npm run build         # Construye para producción
npm run preview       # Vista previa local del build

# Utilidades
npm run lint          # Ejecuta ESLint
npm run typecheck     # Verifica tipos con TypeScript
```

## 🗂️ Estructura del proyecto

```
src/
├── api/               # Conexión con APIs, queries y tipos
├── common/            # Componentes y utilidades comunes
│   ├── context/       # Contextos de React (cart, notifications)
│   ├── hooks/         # Hooks personalizados
│   ├── router/        # Configuración de rutas
│   └── ui/            # Componentes UI (atoms, molecules, organisms)
├── layouts/           # Layout principal de la aplicación
├── modules/           # Módulos principales por página
│   ├── error/         # Página 404
│   ├── home/          # Página de inicio
│   └── products/      # Catálogo de productos
└── styles/            # Estilos globales (SCSS)
```

## ✨ Características principales

- **Modal de detalles** de producto con selección de variantes
- **Carrito de compras** persistente
- **Checkout** con confirmación de compra
- **Diseño responsive** optimizado para móvil y escritorio
- **Blurring** del fondo al abrir modales
- **Productos relacionados** con recomendaciones

## 🛠️ Tecnologías

- React 18
- TypeScript
- Vite
- React Router
- SCSS para estilos
- React Query para manejo de datos
- Framer Motion para animaciones
- ESLint y Prettier para código limpio

## 📝 Notas de desarrollo

- El proyecto usa una estructura modular para facilitar la escalabilidad
- Los estilos están organizados según la metodología 7-1 de SASS
- La carpeta common/ui implementa una arquitectura de UI basada en Atomic Design
- La carpeta `docs/json` contiene una muestra del análisis que hice a la API para entender su estructura

## 🎨 Inspiración de diseño

El diseño y UX del proyecto se inspiró en las siguientes referencias:

- **[Splitbase Hero Sections](https://splitbase.com/blog/hero-section)** - Para el diseño del hero principal
- **[Osklen](https://www.osklen.com)** - Referencia de diseño limpio y minimalista
- **[Chanta Backpack Store](https://dribbble.com/shots/24206270-Chanta-Backpack-Store-Category)** - Layout de grilla de productos y cards
- **[Uniqlo](https://www.uniqlo.com/ph/en/baby)** - UX de navegación y organización de productos

