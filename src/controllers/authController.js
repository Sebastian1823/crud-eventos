const bcrypt = require('bcryptjs');
const pool = require('../config/db');

// ─── Mostrar login ────────────────────────────────────────────────────────────
const getLogin = (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.render('auth/login', { title: 'Iniciar Sesión' });
};

// ─── Procesar login ───────────────────────────────────────────────────────────
const postLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    req.session.error = 'Usuario y contraseña son requeridos.';
    return res.redirect('/login');
  }

  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE username = $1', [username]
    );

    if (result.rows.length === 0) {
      req.session.error = 'Usuario o contraseña incorrectos.';
      return res.redirect('/login');
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      req.session.error = 'Usuario o contraseña incorrectos.';
      return res.redirect('/login');
    }

    req.session.user = { id: user.id_usuario, username: user.username };
    req.session.success = `¡Bienvenido, ${user.username}!`;
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    req.session.error = 'Error al iniciar sesión.';
    res.redirect('/login');
  }
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
const getDashboard = async (req, res) => {
  try {
    const [eventos, organizadores] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM eventos'),
      pool.query('SELECT COUNT(*) FROM organizadores')
    ]);

    res.render('dashboard', {
      title: 'Dashboard',
      totalEventos: eventos.rows[0].count,
      totalOrganizadores: organizadores.rows[0].count
    });
  } catch (err) {
    console.error(err);
    res.render('dashboard', { title: 'Dashboard', totalEventos: 0, totalOrganizadores: 0 });
  }
};

// ─── Logout ───────────────────────────────────────────────────────────────────
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

// ─── Registro (solo para crear el primer admin) ────────────────────────────────
const postRegistro = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    req.session.error = 'Todos los campos son requeridos.';
    return res.redirect('/login');
  }
  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO usuarios (username, password) VALUES ($1, $2)', [username, hashed]
    );
    req.session.success = 'Usuario creado. Ya puedes iniciar sesión.';
    res.redirect('/login');
  } catch (err) {
    if (err.code === '23505') {
      req.session.error = 'Ese nombre de usuario ya existe.';
    } else {
      req.session.error = 'Error al crear usuario.';
    }
    res.redirect('/login');
  }
};

module.exports = { getLogin, postLogin, getDashboard, logout, postRegistro };
