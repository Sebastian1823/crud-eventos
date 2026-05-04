require('dotenv').config();

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const organizadoresRoutes = require('./routes/organizadoresRoutes');
const eventosRoutes = require('./routes/eventosRoutes');

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/organizadores', organizadoresRoutes);
app.use('/eventos', eventosRoutes);

// Ruta raíz redirige a eventos
app.get('/', (req, res) => {
  res.redirect('/eventos');
});

// Manejo de error 404
app.use((req, res) => {
  res.status(404).render('404');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
