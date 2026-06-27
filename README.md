# 🎭 GestorEventos — CRUD de Eventos y Organizadores

Sistema web de administración de eventos y organizadores desarrollado con **Node.js**, **Express.js**, **MySQL**, **EJS** y **Bootstrap 5**. Incluye autenticación de usuarios, panel de administración (dashboard) y subida de afiches a **Cloudinary**.

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| **Node.js** | Entorno de ejecución del servidor |
| **Express.js** | Framework backend para Node.js |
| **MySQL** | Base de datos relacional |
| **mysql2** | Driver MySQL con soporte para Promises |
| **EJS** | Motor de plantillas para las vistas |
| **bcryptjs** | Encriptación de contraseñas |
| **express-session** | Manejo de sesiones de usuario |
| **Multer** | Middleware para subida de archivos |
| **Cloudinary** | Almacenamiento de imágenes en la nube |
| **Bootstrap 5** | Framework CSS para el diseño responsive |
| **method-override** | Soporte para métodos PUT y DELETE en formularios HTML |
| **dotenv** | Variables de entorno desde archivo `.env` |
| **nodemon** | Reinicio automático en desarrollo |

---

## 📁 Estructura del Proyecto

```
crud-eventos/
├── app.js                              ← Punto de entrada principal
├── package.json
├── database.sql                        ← Script SQL para crear las tablas
├── .env                                ← Variables de entorno (no se sube a Git)
├── .gitignore
├── README.md
│
├── public/
│   ├── css/
│   │   └── style.css                   ← Hoja de estilos principal
│   └── uploads/
│
└── src/
    ├── config/
    │   ├── db.js                       ← Conexión a MySQL (pool)
    │   └── cloudinary.js               ← Configuración de Cloudinary
    │
    ├── controllers/
    │   ├── authController.js           ← Login, registro, dashboard, logout
    │   ├── eventosController.js        ← CRUD de eventos
    │   └── organizadoresController.js  ← CRUD de organizadores
    │
    ├── middleware/
    │   ├── auth.js                     ← Verificación de sesión (requireAuth)
    │   └── upload.js                   ← Configuración de Multer + Cloudinary
    │
    ├── routes/
    │   ├── authRoutes.js               ← Rutas de autenticación
    │   ├── eventosRoutes.js            ← Rutas de eventos
    │   └── organizadoresRoutes.js      ← Rutas de organizadores
    │
    └── views/
        ├── home.ejs                    ← Página pública de inicio
        ├── dashboard.ejs               ← Panel de administración
        ├── 404.ejs                     ← Página de error 404
        ├── auth/
        │   └── login.ejs               ← Formulario de login y registro
        ├── eventos/
        │   ├── index.ejs               ← Listado de eventos
        │   ├── create.ejs              ← Formulario de creación
        │   ├── edit.ejs                ← Formulario de edición
        │   └── show.ejs                ← Detalle de evento
        ├── organizadores/
        │   ├── index.ejs               ← Listado de organizadores
        │   ├── create.ejs              ← Formulario de creación
        │   └── edit.ejs                ← Formulario de edición
        └── partials/
            ├── header.ejs              ← Cabecera y navegación
            └── footer.ejs              ← Pie de página
```

---

## 🗄️ Base de Datos

El proyecto utiliza **MySQL** con 3 tablas:

### Tabla `organizadores`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id_organizador` | INT AUTO_INCREMENT | Clave primaria |
| `nombre` | VARCHAR(150) | Nombre del organizador |
| `telefono` | VARCHAR(20) | Teléfono de contacto |
| `created_at` | TIMESTAMP | Fecha de creación |

### Tabla `eventos`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id_evento` | INT AUTO_INCREMENT | Clave primaria |
| `titulo` | VARCHAR(200) | Título del evento |
| `fecha` | DATE | Fecha del evento |
| `afiche` | VARCHAR(500) | URL del afiche en Cloudinary |
| `id_organizador` | INT | FK → `organizadores(id_organizador)` |
| `created_at` | TIMESTAMP | Fecha de creación |

### Tabla `usuarios`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id_usuario` | INT AUTO_INCREMENT | Clave primaria |
| `username` | VARCHAR(100) UNIQUE | Nombre de usuario |
| `password` | VARCHAR(255) | Contraseña encriptada (bcrypt) |
| `created_at` | TIMESTAMP | Fecha de creación |

---

## 🔀 Rutas

### Autenticación
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Redirige a `/dashboard` |
| GET | `/login` | Formulario de login |
| POST | `/login` | Procesar login |
| GET | `/dashboard` | Panel con estadísticas 🔒 |
| POST | `/registro` | Crear usuario admin |
| GET | `/logout` | Cerrar sesión |

### Eventos (`/eventos`)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/eventos` | Listar todos los eventos |
| GET | `/eventos/create` | Formulario de creación |
| POST | `/eventos` | Guardar nuevo evento |
| GET | `/eventos/:id/edit` | Formulario de edición |
| PUT | `/eventos/:id` | Actualizar evento |
| DELETE | `/eventos/:id` | Eliminar evento |

### Organizadores (`/organizadores`)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/organizadores` | Listar todos |
| GET | `/organizadores/create` | Formulario de creación |
| POST | `/organizadores` | Guardar nuevo |
| GET | `/organizadores/:id/edit` | Formulario de edición |
| PUT | `/organizadores/:id` | Actualizar |
| DELETE | `/organizadores/:id` | Eliminar |

> 🔒 Las rutas marcadas requieren autenticación (sesión activa).

---

## 🚀 Instalación Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/crud-eventos.git
cd crud-eventos
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# ─── MySQL ─────────────────────────────────
MYSQLHOST=localhost
MYSQLPORT=3306
MYSQLUSER=root
MYSQLPASSWORD=tu_contraseña
MYSQLDATABASE=crud_eventos

# ─── Servidor ──────────────────────────────
PORT=3000
NODE_ENV=development
SESSION_SECRET=clave_secreta_eventos_2024

# ─── Cloudinary ────────────────────────────
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### 4. Crear la base de datos y tablas

#### Opción A — Desde la terminal de MySQL

```bash
mysql -u root -p
```

```sql
CREATE DATABASE crud_eventos;
USE crud_eventos;
SOURCE database.sql;
```

#### Opción B — Desde MySQL Workbench o DBeaver

1. Abre **MySQL Workbench** o **DBeaver** y conéctate a tu servidor MySQL.
2. Crea una nueva base de datos llamada `crud_eventos`.
3. Abre un nuevo editor SQL, copia y pega el contenido de `database.sql`.
4. Ejecuta el script (`Ctrl + Enter` o botón ▶️).
5. Verifica que las tablas `organizadores`, `eventos` y `usuarios` fueron creadas.

### 5. Iniciar el servidor

```bash
# Modo desarrollo (con reinicio automático)
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en `http://localhost:3000`

---

## ☁️ Deploy en Render

### 1. Subir el código a GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/crud-eventos.git
git push -u origin main
```

### 2. Crear una base de datos MySQL

Usa un proveedor de MySQL en la nube como **Railway**, **PlanetScale**, **TiDB Cloud** o **Clever Cloud**. Obtén las credenciales de conexión (host, port, user, password, database).

### 3. Crear un Web Service en Render

1. Ingresa a [https://render.com](https://render.com) y haz login.
2. Haz clic en **New** → **Web Service**.
3. Conecta tu repositorio de GitHub.
4. Configura los siguientes campos:
   - **Name**: `crud-eventos`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 4. Agregar Variables de Entorno

En el dashboard del servicio en Render, ve a **Environment** y agrega:

| Variable | Valor |
|---|---|
| `MYSQLHOST` | Host de tu base de datos MySQL |
| `MYSQLPORT` | Puerto (generalmente `3306`) |
| `MYSQLUSER` | Usuario de la base de datos |
| `MYSQLPASSWORD` | Contraseña de la base de datos |
| `MYSQLDATABASE` | Nombre de la base de datos |
| `SESSION_SECRET` | Una clave secreta para las sesiones |
| `CLOUDINARY_CLOUD_NAME` | Tu cloud name de Cloudinary |
| `CLOUDINARY_API_KEY` | Tu API key de Cloudinary |
| `CLOUDINARY_API_SECRET` | Tu API secret de Cloudinary |
| `NODE_ENV` | `production` |

### 5. Deploy

Render hará el deploy automáticamente al detectar cambios en el repositorio. El servicio estará disponible en la URL que Render te asigne.

---

## 📌 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| `npm start` | `node src/app.js` | Inicia el servidor en producción |
| `npm run dev` | `nodemon src/app.js` | Inicia con reinicio automático (desarrollo) |

---

## 👤 Autor

Proyecto desarrollado como práctica de desarrollo web con Node.js y MySQL.
