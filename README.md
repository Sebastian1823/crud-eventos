# 🎭 GestorEventos — CRUD de Eventos y Organizadores

Sistema web de administración de eventos y organizadores desarrollado con **Node.js**, **Express.js**, **PostgreSQL**, **EJS** y **Bootstrap 5**. Permite crear, leer, actualizar y eliminar eventos con subida de afiches a **Cloudinary**.

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| **Express.js** | Framework backend para Node.js |
| **PostgreSQL** | Base de datos relacional |
| **EJS** | Motor de plantillas para las vistas |
| **Multer** | Middleware para subida de archivos |
| **Cloudinary** | Almacenamiento de imágenes en la nube |
| **Bootstrap 5** | Framework CSS para el diseño responsive |
| **method-override** | Soporte para métodos PUT y DELETE en formularios HTML |

---

## 📁 Estructura del Proyecto

```
eventos-crud/
├── src/
│   ├── app.js
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── organizadoresController.js
│   │   └── eventosController.js
│   ├── routes/
│   │   ├── organizadoresRoutes.js
│   │   └── eventosRoutes.js
│   ├── middleware/
│   │   └── upload.js
│   └── views/
│       ├── partials/
│       │   ├── header.ejs
│       │   └── footer.ejs
│       ├── organizadores/
│       │   ├── index.ejs
│       │   ├── create.ejs
│       │   └── edit.ejs
│       └── eventos/
│           ├── index.ejs
│           ├── create.ejs
│           └── edit.ejs
├── public/
│   └── uploads/
├── database.sql
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Instalación Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/eventos-crud.git
cd eventos-crud
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```env
DATABASE_URL=postgresql://usuario:password@host:5432/nombre_bd
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
NODE_ENV=development
PORT=3000
```

### 4. Ejecutar el script SQL en DBeaver

Ver la sección siguiente para el paso a paso.

### 5. Iniciar el servidor en modo desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

---

## 🗄️ Cómo ejecutar database.sql en DBeaver

### Paso a paso:

1. **Abrir DBeaver** y conectarse a tu base de datos PostgreSQL (ya sea local o en Render).

2. **Crear la conexión** (si no la tienes):
   - Haz clic en **Nueva Conexión** → Selecciona **PostgreSQL**.
   - Ingresa los datos de tu base de datos:
     - **Host**: el host de Render (ej: `dpg-xxxxx.oregon-postgres.render.com`)
     - **Port**: `5432`
     - **Database**: nombre de tu base de datos
     - **Username**: tu usuario
     - **Password**: tu contraseña
   - Haz clic en **Test Connection** para verificar y luego **Finalizar**.

3. **Abrir el editor SQL**:
   - Haz clic derecho en tu conexión → **Editor SQL** → **Nuevo editor SQL**.

4. **Copiar y pegar** el contenido del archivo `database.sql` en el editor.

5. **Ejecutar el script**:
   - Selecciona todo el texto (`Ctrl + A`).
   - Haz clic en el botón **Ejecutar** (▶️) o presiona `Ctrl + Enter`.

6. **Verificar**: En el panel de navegación izquierdo, expande tu base de datos → **Schemas** → **public** → **Tables** para confirmar que las tablas `organizadores` y `eventos` fueron creadas correctamente.

---

## ☁️ Deploy en Render

### 1. Subir el código a GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/eventos-crud.git
git push -u origin main
```

### 2. Crear un Web Service en Render

1. Ingresa a [https://render.com](https://render.com) y haz login.
2. Haz clic en **New** → **Web Service**.
3. Conecta tu repositorio de GitHub.
4. Configura los siguientes campos:
   - **Name**: `eventos-crud`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 3. Agregar Variables de Entorno

En el dashboard del servicio en Render, ve a **Environment** y agrega:

| Variable | Valor |
|---|---|
| `DATABASE_URL` | La URL de tu base de datos PostgreSQL en Render |
| `CLOUDINARY_CLOUD_NAME` | Tu cloud name de Cloudinary |
| `CLOUDINARY_API_KEY` | Tu API key de Cloudinary |
| `CLOUDINARY_API_SECRET` | Tu API secret de Cloudinary |
| `NODE_ENV` | `production` |

### 4. Deploy

Render hará el deploy automáticamente al detectar cambios en el repositorio. El servicio estará disponible en la URL que Render te asigne.

---

## 👤 Autor

Proyecto desarrollado como práctica de desarrollo web con Node.js y PostgreSQL.
