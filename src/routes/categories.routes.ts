import express from 'express';

import categoryController from '@controllers/CategoryController';

const router = express.Router();

router.get('/', categoryController.index);
router.get('/:id', categoryController.show);
router.post('/', categoryController.store);
router.patch('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);

export default router;
