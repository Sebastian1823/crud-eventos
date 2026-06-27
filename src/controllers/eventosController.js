const pool = require('../config/db');

const eventosController = {
  // GET /eventos — Listar todos los eventos
  index: async (req, res) => {
    try {
      const [rows] = await pool.query(
        `SELECT e.*, o.nombre AS nombre_organizador
         FROM eventos e
         JOIN organizadores o USING(id_organizador)
         ORDER BY e.fecha DESC`
      );
      res.render('eventos/index', { eventos: rows });
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  // GET /eventos/create — Mostrar formulario de creación
  createForm: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM organizadores ORDER BY nombre');
      res.render('eventos/create', { organizadores: rows });
    } catch (error) {
      console.error('Error al cargar formulario:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  // POST /eventos — Guardar nuevo evento
  store: async (req, res) => {
    try {
      const { titulo, fecha, id_organizador } = req.body;

      if (!titulo || !titulo.trim() || !fecha || !id_organizador) {
        return res.redirect('/eventos/create');
      }

      const afiche = req.file ? req.file.path : null;

      await pool.query(
        'INSERT INTO eventos (titulo, fecha, afiche, id_organizador) VALUES (?, ?, ?, ?)',
        [titulo.trim(), fecha, afiche, id_organizador]
      );

      res.redirect('/eventos');
    } catch (error) {
      console.error('Error al crear evento:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  // GET /eventos/:id/edit — Mostrar formulario de edición
  editForm: async (req, res) => {
    try {
      const { id } = req.params;

      const [eventoRows] = await pool.query(
        'SELECT * FROM eventos WHERE id_evento = ?',
        [id]
      );

      if (eventoRows.length === 0) {
        return res.redirect('/eventos');
      }

      const [organizadoresRows] = await pool.query(
        'SELECT * FROM organizadores ORDER BY nombre'
      );

      res.render('eventos/edit', {
        evento: eventoRows[0],
        organizadores: organizadoresRows
      });
    } catch (error) {
      console.error('Error al cargar formulario de edición:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  // PUT /eventos/:id — Actualizar evento
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, fecha, id_organizador, afiche_actual } = req.body;

      if (!titulo || !titulo.trim() || !fecha || !id_organizador) {
        return res.redirect(`/eventos/${id}/edit`);
      }

      let afiche;
      if (req.file) {
        afiche = req.file.path;
      } else {
        afiche = afiche_actual || null;
      }

      await pool.query(
        'UPDATE eventos SET titulo = ?, fecha = ?, afiche = ?, id_organizador = ? WHERE id_evento = ?',
        [titulo.trim(), fecha, afiche, id_organizador, id]
      );

      res.redirect('/eventos');
    } catch (error) {
      console.error('Error al actualizar evento:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  // DELETE /eventos/:id — Eliminar evento
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query(
        'DELETE FROM eventos WHERE id_evento = ?',
        [id]
      );
      res.redirect('/eventos');
    } catch (error) {
      console.error('Error al eliminar evento:', error);
      res.status(500).send('Error interno del servidor');
    }
  }
};

module.exports = eventosController;
