const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const ctrl = require('../controllers/organizadoresController');

router.use(requireAuth); // Todas las rutas requieren login

router.get('/', ctrl.index);
router.get('/crear', ctrl.create);
router.post('/', ctrl.store);
router.get('/:id/editar', ctrl.edit);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.destroy);

module.exports = router;
