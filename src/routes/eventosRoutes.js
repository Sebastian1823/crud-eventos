const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const ctrl = require('../controllers/eventosController');

router.use(requireAuth); // Todas las rutas requieren login

router.get('/', ctrl.index);
router.get('/crear', ctrl.create);
router.post('/', upload.single('afiche'), ctrl.store);
router.get('/:id', ctrl.show);
router.get('/:id/editar', ctrl.edit);
router.put('/:id', upload.single('afiche'), ctrl.update);
router.delete('/:id', ctrl.destroy);

module.exports = router;
