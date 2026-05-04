const pool = require('../config/db');
const { cloudinary } = require('../config/cloudinary');

// ─── Listar eventos ───────────────────────────────────────────────────────────
const index = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.*, o.nombre AS nombre_organizador, o.telefono
      FROM eventos e
      LEFT JOIN organizadores o ON e.id_organizador = o.id_organizador
      ORDER BY e.id_evento DESC
    `);
    res.render('eventos/index', {
      title: 'Eventos',
      eventos: result.rows
    });
  } catch (err) {
    console.error(err);
    req.session.error = 'Error al obtener los eventos.';
    res.redirect('/dashboard');
  }
};

// ─── Formulario crear ─────────────────────────────────────────────────────────
const create = async (req, res) => {
  try {
    const orgs = await pool.query('SELECT * FROM organizadores ORDER BY nombre');
    res.render('eventos/create', {
      title: 'Nuevo Evento',
      organizadores: orgs.rows
    });
  } catch (err) {
    console.error(err);
    req.session.error = 'Error al cargar formulario.';
    res.redirect('/eventos');
  }
};

// ─── Guardar evento ───────────────────────────────────────────────────────────
const store = async (req, res) => {
  const { titulo, fecha, id_organizador } = req.body;

  if (!titulo || !fecha || !id_organizador) {
    req.session.error = 'Título, fecha y organizador son campos obligatorios.';
    return res.redirect('/eventos/crear');
  }

  const afiche = req.file ? req.file.path : null;

  try {
    await pool.query(
      'INSERT INTO eventos (titulo, fecha, afiche, id_organizador) VALUES ($1, $2, $3, $4)',
      [titulo.trim(), fecha, afiche, id_organizador]
    );
    req.session.success = 'Evento creado exitosamente.';
    res.redirect('/eventos');
  } catch (err) {
    console.error(err);
    req.session.error = 'Error al crear el evento.';
    res.redirect('/eventos/crear');
  }
};

// ─── Ver detalle del evento ───────────────────────────────────────────────────
const show = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT e.*, o.nombre AS nombre_organizador, o.telefono
      FROM eventos e
      LEFT JOIN organizadores o ON e.id_organizador = o.id_organizador
      WHERE e.id_evento = $1
    `, [id]);

    if (result.rows.length === 0) {
      req.session.error = 'Evento no encontrado.';
      return res.redirect('/eventos');
    }
    res.render('eventos/show', {
      title: result.rows[0].titulo,
      evento: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    req.session.error = 'Error al obtener el evento.';
    res.redirect('/eventos');
  }
};

// ─── Formulario editar ────────────────────────────────────────────────────────
const edit = async (req, res) => {
  const { id } = req.params;
  try {
    const [eventoRes, orgsRes] = await Promise.all([
      pool.query('SELECT * FROM eventos WHERE id_evento = $1', [id]),
      pool.query('SELECT * FROM organizadores ORDER BY nombre')
    ]);

    if (eventoRes.rows.length === 0) {
      req.session.error = 'Evento no encontrado.';
      return res.redirect('/eventos');
    }
    res.render('eventos/edit', {
      title: 'Editar Evento',
      evento: eventoRes.rows[0],
      organizadores: orgsRes.rows
    });
  } catch (err) {
    console.error(err);
    req.session.error = 'Error al cargar el evento.';
    res.redirect('/eventos');
  }
};

// ─── Actualizar evento ────────────────────────────────────────────────────────
const update = async (req, res) => {
  const { id } = req.params;
  const { titulo, fecha, id_organizador } = req.body;

  if (!titulo || !fecha || !id_organizador) {
    req.session.error = 'Título, fecha y organizador son campos obligatorios.';
    return res.redirect(`/eventos/${id}/editar`);
  }

  try {
    // Obtener afiche actual
    const current = await pool.query('SELECT afiche FROM eventos WHERE id_evento=$1', [id]);
    let afiche = current.rows[0]?.afiche || null;

    // Si se subió nueva imagen, eliminar la anterior de Cloudinary
    if (req.file) {
      if (afiche) {
        const publicId = afiche.split('/').slice(-2).join('/').replace(/\.[^/.]+$/, '');
        await cloudinary.uploader.destroy(publicId).catch(() => {});
      }
      afiche = req.file.path;
    }

    await pool.query(
      'UPDATE eventos SET titulo=$1, fecha=$2, afiche=$3, id_organizador=$4 WHERE id_evento=$5',
      [titulo.trim(), fecha, afiche, id_organizador, id]
    );
    req.session.success = 'Evento actualizado exitosamente.';
    res.redirect('/eventos');
  } catch (err) {
    console.error(err);
    req.session.error = 'Error al actualizar el evento.';
    res.redirect(`/eventos/${id}/editar`);
  }
};

// ─── Eliminar evento ──────────────────────────────────────────────────────────
const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM eventos WHERE id_evento=$1 RETURNING afiche', [id]
    );
    // Eliminar imagen de Cloudinary si existe
    if (result.rows[0]?.afiche) {
      const afiche = result.rows[0].afiche;
      const publicId = afiche.split('/').slice(-2).join('/').replace(/\.[^/.]+$/, '');
      await cloudinary.uploader.destroy(publicId).catch(() => {});
    }
    req.session.success = 'Evento eliminado exitosamente.';
    res.redirect('/eventos');
  } catch (err) {
    console.error(err);
    req.session.error = 'Error al eliminar el evento.';
    res.redirect('/eventos');
  }
};

module.exports = { index, create, store, show, edit, update, destroy };
