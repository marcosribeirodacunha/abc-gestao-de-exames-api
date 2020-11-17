import express from 'express';

import JobController from '@controllers/JobController';

const router = express.Router();

router.get('/', JobController.index);
router.get('/:id', JobController.show);
router.post('/', JobController.store);
router.patch('/:id', JobController.update);
router.delete('/:id', JobController.delete);

export default router;
