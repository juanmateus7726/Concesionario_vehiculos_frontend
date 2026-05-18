# Frontend - Vehiculos

-Aplicacion web desarrollado con Next.js 14 para gestion de vehiculos de un concesionario.
Consume las APIs del backend, Implementa autenticacion JWT, control de acceso por roles 
y animaciones fluidas basadas en el diseno de Figma.


-Stack Tecnologico

Next.js 14
TypeScript
Tailwind CSS
Framer Motion


-Estructura del Proyecto

frontend-vehiculos/
├── app/
│   ├── page.tsx                # Home / Landing
│   ├── login/page.tsx          # Inicio de sesión
│   ├── register/page.tsx       # Registro de usuario
│   ├── dashboard/page.tsx      # Panel CRUD de vehículos
│   ├── forgot-password/page.tsx # Recuperar contraseña
│   └── reset-password/page.tsx  # Nueva contraseña
├── components/
│   └── VehicleTable.tsx        # Tabla de vehículos con animaciones
├── lib/
│   ├── api.ts                  # Funciones de login y registro
│   ├── auth.ts                 # Manejo de tokens y cookies
│   └── axios.ts                # Instancia Axios con interceptores JWT
├── types/
│   └── index.ts                # Tipos TypeScript (Vehicle, User)
├── middleware.ts               # Protección de rutas Next.js
└── public/assets/              # Imágenes, logos e iconos SVG


-Autenticacion y Seguridad

*Tokens JWT almacenados en localStorage y cookies (para middleware)
*Interceptor Axios adjunta el token automáticamente en cada petición
*Si el token expira → limpia sesión y redirige al login con mensaje
*Middleware Next.js protege rutas: / y /dashboard requieren token
*Renderizado condicional por rol: Viewer no ve botones de crear/editar/eliminar


-Flujo de la alicacion

/login  ->  / (home)    /dashboard
*Sin sesión → redirige a /login
*Con sesión en /login → redirige a /
*Admin → ve formulario CRUD completo
*Viewer → solo ve la tabla de vehículos


-Instalacion y Ejecucion Local

Requisitos
*Node.js
*Backend corriendo

Pasos en el despliegue

1. Clonar el repositorio
git clone https://github.com/juanmateus7726/Concesionario_vehiculos_frontend

2. Entrar a la carpeta
cd frontend-vehiculos

3. Instalar dependencias
npm install

4. Crear archivo de variables de entorno
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

5. Correr en desarrollo
npm run dev



-Caracteristicas implementadas

*Home animado — ola decorativa y textos con animación de entrada
*Login/Register — validación, show/hide password, mensajes de error
*Recuperación de contraseña — envío real de correo via Gmail SMTP
*Dashboard CRUD — crear, editar, eliminar vehículos con animaciones
*Modal de confirmación — al eliminar vehículos
*Toast de notificaciones — mensajes de éxito y error
*Dropdown de usuario — muestra nombre, rol y cierre de sesión
*Animaciones de tabla — filas con entrada escalonada (Framer Motion)
*Responsivo — adaptado para móvil, tablet y desktop