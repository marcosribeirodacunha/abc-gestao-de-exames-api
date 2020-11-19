import 'dotenv/config';
import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import './database';
import uploadConfig from '@config/upload';

import handleErrors from './middlewares/handleErrors';
import router from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(router);

app.use(handleErrors);

const port = process.env.PORT || 3333;

app.listen(port, () =>
  console.log(`------ Server is running on port ${port} ------`),
);
