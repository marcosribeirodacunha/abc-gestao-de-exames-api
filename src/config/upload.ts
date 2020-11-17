import crypto from 'crypto';
import { Request } from 'express';
import multer from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, cb) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      file.key = `${fileHash}-${file.originalname}`;
      cb(null, file.key);
    },
  }),

  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ): void => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];

    if (allowedMimes.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Arquivo de tipo inválido'));
  },
};
