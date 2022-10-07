import express from 'express';

const apiRoutes = express.Router();

/* apiRouter use userRouter etc */

const router = express.Router();
router.use('/api', apiRoutes);

export default router;
