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

// Ruta raíz — Home pública
const pool = require('./config/db');
app.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT e.id_evento, e.titulo, e.fecha, e.afiche, o.nombre AS nombre_organizador
       FROM eventos e
       JOIN organizadores o USING(id_organizador)
       ORDER BY e.fecha ASC`
    );
    res.render('home', { eventos: result.rows });
  } catch (error) {
    console.error('Error al cargar home:', error);
    res.render('home', { eventos: [] });
  }
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
