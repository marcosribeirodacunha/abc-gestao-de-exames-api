import express from 'express';

import examController from '@controllers/ExamController';

const router = express.Router();

router.get('/', examController.index);
router.get('/:id', examController.show);
router.post('/', examController.store);
router.patch('/:id', examController.update);
router.delete('/:id', examController.delete);

export default router;
