# 🎪 EventosPro — CRUD de Eventos y Organizadores

Sistema web CRUD completo desarrollado con **Express.js** y **PostgreSQL**, con carga de imágenes en **Cloudinary**, autenticación por sesiones y despliegue en **Render**.

## 🛠️ Tecnologías

| Herramienta | Uso |
|---|---|
| Express.js | Framework backend |
| PostgreSQL | Base de datos (Render) |
| EJS | Motor de plantillas |
| Cloudinary + Multer | Carga de imágenes |
| bcryptjs | Encriptación de contraseñas |
| express-session | Manejo de sesiones |
| Bootstrap 5 | Interfaz de usuario |

## 📁 Estructura del proyecto

```
eventos-crud/
├── src/
│   ├── config/
│   │   ├── db.js              # Conexión a PostgreSQL
│   │   └── cloudinary.js      # Configuración Cloudinary + Multer
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventosController.js
│   │   └── organizadoresController.js
│   ├── middleware/
│   │   └── auth.js            # Middleware de autenticación
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventosRoutes.js
│   │   └── organizadoresRoutes.js
│   └── views/
│       ├── auth/login.ejs
│       ├── eventos/           # index, create, edit, show
│       ├── organizadores/     # index, create, edit
│       ├── partials/          # header, navbar, footer
│       └── dashboard.ejs
├── public/css/style.css
├── app.js
├── database.sql               # Script para crear tablas
├── .env.example
└── package.json
```

## ⚙️ Instalación local

### 1. Clonar repositorio
```bash
git clone https://github.com/TU_USUARIO/eventos-crud.git
cd eventos-crud
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

### 4. Crear tablas en la base de datos
- Abre DBeaver y conéctate a tu BD de Render
- Ejecuta el archivo `database.sql`

### 5. Iniciar el servidor
```bash
npm run dev   # Desarrollo (nodemon)
npm start     # Producción
```

## 🌐 Variables de entorno (.env)

```env
DATABASE_URL=postgresql://usuario:contraseña@host:5432/nombre_db
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
SESSION_SECRET=una_clave_muy_segura
NODE_ENV=development
PORT=3000
```

## 🔐 Credenciales por defecto

| Usuario | Contraseña |
|---|---|
| `admin` | `admin123` |

> ⚠️ **Cambia la contraseña en producción** usando la ruta `POST /registro`

## 📋 Rutas disponibles

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/login` | Pantalla de login |
| POST | `/login` | Autenticar usuario |
| GET | `/logout` | Cerrar sesión |
| GET | `/dashboard` | Panel principal |
| GET | `/eventos` | Listar eventos |
| GET | `/eventos/crear` | Formulario nuevo evento |
| POST | `/eventos` | Guardar evento |
| GET | `/eventos/:id` | Ver detalle |
| GET | `/eventos/:id/editar` | Formulario editar |
| PUT | `/eventos/:id` | Actualizar evento |
| DELETE | `/eventos/:id` | Eliminar evento |
| GET | `/organizadores` | Listar organizadores |
| GET | `/organizadores/crear` | Formulario nuevo |
| POST | `/organizadores` | Guardar organizador |
| GET | `/organizadores/:id/editar` | Formulario editar |
| PUT | `/organizadores/:id` | Actualizar |
| DELETE | `/organizadores/:id` | Eliminar |

## 🚀 Despliegue en Render

### Base de datos PostgreSQL
1. Render Dashboard → **New** → **PostgreSQL**
2. Copia la **External Database URL**
3. Ejecuta `database.sql` desde DBeaver

### Web Service
1. Render Dashboard → **New** → **Web Service**
2. Conecta tu repositorio de GitHub
3. Configuración:
   - **Build Command:** `npm install`
   - **Start Command:** `node app.js`
4. En **Environment Variables**, agrega:
   - `DATABASE_URL` → URL de tu BD de Render
   - `CLOUDINARY_CLOUD_NAME` → De tu cuenta Cloudinary
   - `CLOUDINARY_API_KEY` → De tu cuenta Cloudinary
   - `CLOUDINARY_API_SECRET` → De tu cuenta Cloudinary
   - `SESSION_SECRET` → Una clave larga y aleatoria
   - `NODE_ENV` → `production`

## ☁️ Configurar Cloudinary

1. Regístrate gratis en [cloudinary.com](https://cloudinary.com)
2. En el Dashboard copia: `Cloud Name`, `API Key`, `API Secret`
3. Agrégalos al `.env` local y a las variables de Render

## 👨‍💻 Autor

**Bayona Sebastian** — Examen CRUD Express.js + PostgreSQL
