import express from 'express';

import userController from '@controllers/UserController';

const router = express.Router();

router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/', userController.store);
router.patch('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
