/* eslint-disable @typescript-eslint/no-non-null-assertion */
import crypto from 'crypto';
import { Request } from 'express';
import ibm from 'ibm-cos-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

type storageType = { [key: string]: multer.StorageEngine };

const storageTypes: storageType = {
  local: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, cb) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      file.key = `${fileHash}-${file.originalname}`;
      cb(null, file.key);
    },
  }),

  cos: multerS3({
    s3: new ibm.S3({
      endpoint: process.env.IBM_ENDPOINT,
      apiKeyId: process.env.IBM_API_KEY_ID,
      ibmAuthEndpoint: process.env.IBM_AUTH_ENDPOINT,
      serviceInstanceId: process.env.IBM_SERVICE_INSTANCE_ID,
    }),
    bucket: process.env.IBM_BUCKET!,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      file.key = `${fileHash}-${file.originalname}`;
      cb(null, file.key);
    },
  }),
};

export default {
  directory: tmpFolder,
  storage: storageTypes[process.env.STORAGE_TYPE || 'local'],
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
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
