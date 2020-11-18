import express from 'express';

import jobController from '@controllers/JobController';

const router = express.Router();

router.get('/', jobController.index);
router.get('/:id', jobController.show);
router.post('/', jobController.store);
router.patch('/:id', jobController.update);
router.delete('/:id', jobController.delete);

export default router;
