import express from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import jobController from '@controllers/JobController';
import userController from '@controllers/UserController';

const router = express.Router();

const upload = multer(uploadConfig);

router.get('', (req, res) =>
  res
    .status(200)
    .json({ message: 'Bem vindo a api da ABC - Gestão de exames' }),
);
router.post('/secret/jobs', jobController.store);
router.post('/secret/users', upload.single('photo'), userController.store);

export default router;
