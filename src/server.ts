import express from 'express';
import 'express-async-errors';
import 'dotenv/config';
import helmet from 'helmet';
import morgan from 'morgan';

import './database';
import handleErrors from './middlewares/handleErrors';
import router from './routes';

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(router);

app.use(handleErrors);

const port = process.env.PORT || 3333;

app.listen(port, () =>
  console.log(`------ Server is running on port ${port} ------`),
);
