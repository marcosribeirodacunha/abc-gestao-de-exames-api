import express from 'express';

import examTypesController from '@controllers/ExamTypeController';

const router = express.Router();

router.get('/', examTypesController.index);
router.get('/:id', examTypesController.show);
router.post('/', examTypesController.store);
router.patch('/:id', examTypesController.update);
router.delete('/:id', examTypesController.delete);

export default router;
