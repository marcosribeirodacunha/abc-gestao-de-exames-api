import express from 'express';

import examTypes from './examTypes.routes';
import jobsRouter from './jobs.routes';
import usersRouter from './users.routes';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/jobs', jobsRouter);
router.use('/exam-types', examTypes);

export default router;
