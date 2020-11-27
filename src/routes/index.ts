import express from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import categoriesRouter from './categories.routes';
import examsRouter from './exams.routes';
import examTypes from './examTypes.routes';
import jobsRouter from './jobs.routes';
import rootRouter from './root.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const router = express.Router();

router.use('/', rootRouter);
router.use('/sessions', sessionsRouter);

router.use(ensureAuthenticated);

router.use('/users', usersRouter);
router.use('/jobs', jobsRouter);
router.use('/exam-types', examTypes);
router.use('/categories', categoriesRouter);
router.use('/exams', examsRouter);

export default router;
