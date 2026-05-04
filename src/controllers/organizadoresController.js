const pool = require('../config/db');

const organizadoresController = {
  // GET /organizadores — Listar todos los organizadores
  index: async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM organizadores ORDER BY id_organizador ASC');
      res.render('organizadores/index', { organizadores: result.rows });
    } catch (error) {
      console.error('Error al obtener organizadores:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  // GET /organizadores/create — Mostrar formulario de creación
  createForm: async (req, res) => {
    try {
      res.render('organizadores/create');
    } catch (error) {
      console.error('Error al cargar formulario:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  // POST /organizadores — Guardar nuevo organizador
  store: async (req, res) => {
    try {
      const { nombre, telefono } = req.body;

      if (!nombre || !nombre.trim() || !telefono || !telefono.trim()) {
        return res.redirect('/organizadores/create');
      }

      await pool.query(
        'INSERT INTO organizadores (nombre, telefono) VALUES ($1, $2)',
        [nombre.trim(), telefono.trim()]
      );

      res.redirect('/organizadores');
    } catch (error) {
      console.error('Error al crear organizador:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  // GET /organizadores/:id/edit — Mostrar formulario de edición
  editForm: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query(
        'SELECT * FROM organizadores WHERE id_organizador = $1',
        [id]
      );

      if (result.rows.length === 0) {
        return res.redirect('/organizadores');
      }

      res.render('organizadores/edit', { organizador: result.rows[0] });
    } catch (error) {
      console.error('Error al cargar formulario de edición:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  // PUT /organizadores/:id — Actualizar organizador
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, telefono } = req.body;

      if (!nombre || !nombre.trim() || !telefono || !telefono.trim()) {
        return res.redirect(`/organizadores/${id}/edit`);
      }

      await pool.query(
        'UPDATE organizadores SET nombre = $1, telefono = $2 WHERE id_organizador = $3',
        [nombre.trim(), telefono.trim(), id]
      );

      res.redirect('/organizadores');
    } catch (error) {
      console.error('Error al actualizar organizador:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  // DELETE /organizadores/:id — Eliminar organizador
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query(
        'DELETE FROM organizadores WHERE id_organizador = $1',
        [id]
      );
      res.redirect('/organizadores');
    } catch (error) {
      console.error('Error al eliminar organizador:', error);
      res.status(500).send('Error interno del servidor');
    }
  }
};

module.exports = organizadoresController;
