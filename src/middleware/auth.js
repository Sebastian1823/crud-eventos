// Verifica que el usuario esté autenticado
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    req.session.error = 'Debes iniciar sesión para acceder a esta página.';
    return res.redirect('/login');
  }
  next();
};

module.exports = { requireAuth };
