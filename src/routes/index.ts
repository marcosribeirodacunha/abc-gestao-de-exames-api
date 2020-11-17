import express from 'express';

import jobsRouter from './jobs.routes';
import usersRouter from './users.routes';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/jobs', jobsRouter);

export default router;
