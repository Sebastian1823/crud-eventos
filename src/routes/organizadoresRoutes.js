const { Router } = require('express');
const router = Router();
const organizadoresController = require('../controllers/organizadoresController');

router.get('/', organizadoresController.index);
router.get('/create', organizadoresController.createForm);
router.post('/', organizadoresController.store);
router.get('/:id/edit', organizadoresController.editForm);
router.put('/:id', organizadoresController.update);
router.delete('/:id', organizadoresController.destroy);

module.exports = router;
