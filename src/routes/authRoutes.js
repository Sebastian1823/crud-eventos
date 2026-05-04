const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const { getLogin, postLogin, getDashboard, logout, postRegistro } = require('../controllers/authController');

router.get('/', (req, res) => res.redirect('/dashboard'));
router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/dashboard', requireAuth, getDashboard);
router.post('/registro', postRegistro); // Solo para crear el primer admin
router.get('/logout', logout);

module.exports = router;
