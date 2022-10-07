import express from 'express';
import userRoutes from './user';

const apiRoutes = express.Router();

apiRoutes.use('/user', userRoutes);

const router = express.Router();
router.use('/api', apiRoutes);

export default router;
