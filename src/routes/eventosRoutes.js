const { Router } = require('express');
const router = Router();
const eventosController = require('../controllers/eventosController');
const upload = require('../middleware/upload');

router.get('/', eventosController.index);
router.get('/create', eventosController.createForm);
router.post('/', upload, eventosController.store);
router.get('/:id/edit', eventosController.editForm);
router.put('/:id', upload, eventosController.update);
router.delete('/:id', eventosController.destroy);

module.exports = router;
