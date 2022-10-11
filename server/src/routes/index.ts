import express from 'express';
import userRoutes from './user';
import inviteRoutes from './invite';

const apiRoutes = express.Router();

apiRoutes.use('/user', userRoutes);
apiRoutes.use('/invite', inviteRoutes);

const router = express.Router();
router.use('/api', apiRoutes);

export default router;
