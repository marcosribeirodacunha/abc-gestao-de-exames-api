import express from 'express';

import sessionController from '@controllers/SessionController';

const router = express.Router();

router.post('/', sessionController.store);

export default router;
