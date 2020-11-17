import express from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import userController from '@controllers/UserController';

const router = express.Router();

const upload = multer(uploadConfig);

router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/', upload.single('photo'), userController.store);
router.patch('/:id', upload.single('photo'), userController.update);
router.delete('/:id', userController.delete);

export default router;
