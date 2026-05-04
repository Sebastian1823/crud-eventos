const pool = require('../config/db');

// ─── Listar organizadores ─────────────────────────────────────────────────────
const index = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM organizadores ORDER BY id_organizador DESC'
    );
    res.render('organizadores/index', {
      title: 'Organizadores',
      organizadores: result.rows
    });
  } catch (err) {
    console.error(err);
    req.session.error = 'Error al obtener organizadores.';
    res.redirect('/dashboard');
  }
};

// ─── Formulario crear ─────────────────────────────────────────────────────────
const create = (req, res) => {
  res.render('organizadores/create', { title: 'Nuevo Organizador' });
};

// ─── Guardar organizador ──────────────────────────────────────────────────────
const store = async (req, res) => {
  const { nombre, telefono } = req.body;

  if (!nombre || !telefono) {
    req.session.error = 'Nombre y teléfono son campos obligatorios.';
    return res.redirect('/organizadores/crear');
  }

  try {
    await pool.query(
      'INSERT INTO organizadores (nombre, telefono) VALUES ($1, $2)',
      [nombre.trim(), telefono.trim()]
    );
    req.session.success = 'Organizador creado exitosamente.';
    res.redirect('/organizadores');
  } catch (err) {
    console.error(err);
    req.session.error = 'Error al crear el organizador.';
    res.redirect('/organizadores/crear');
  }
};

// ─── Formulario editar ────────────────────────────────────────────────────────
const edit = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM organizadores WHERE id_organizador = $1', [id]
    );
    if (result.rows.length === 0) {
      req.session.error = 'Organizador no encontrado.';
      return res.redirect('/organizadores');
    }
    res.render('organizadores/edit', {
      title: 'Editar Organizador',
      organizador: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    req.session.error = 'Error al cargar el organizador.';
    res.redirect('/organizadores');
  }
};

// ─── Actualizar organizador ───────────────────────────────────────────────────
const update = async (req, res) => {
  const { id } = req.params;
  const { nombre, telefono } = req.body;

  if (!nombre || !telefono) {
    req.session.error = 'Nombre y teléfono son campos obligatorios.';
    return res.redirect(`/organizadores/${id}/editar`);
  }

  try {
    const result = await pool.query(
      'UPDATE organizadores SET nombre=$1, telefono=$2 WHERE id_organizador=$3 RETURNING *',
      [nombre.trim(), telefono.trim(), id]
    );
    if (result.rowCount === 0) {
      req.session.error = 'Organizador no encontrado.';
      return res.redirect('/organizadores');
    }
    req.session.success = 'Organizador actualizado exitosamente.';
    res.redirect('/organizadores');
  } catch (err) {
    console.error(err);
    req.session.error = 'Error al actualizar el organizador.';
    res.redirect(`/organizadores/${id}/editar`);
  }
};

// ─── Eliminar organizador ─────────────────────────────────────────────────────
const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM organizadores WHERE id_organizador = $1', [id]);
    req.session.success = 'Organizador eliminado exitosamente.';
    res.redirect('/organizadores');
  } catch (err) {
    console.error(err);
    req.session.error = 'No se puede eliminar: el organizador tiene eventos asociados.';
    res.redirect('/organizadores');
  }
};

module.exports = { index, create, store, edit, update, destroy };
