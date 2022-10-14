import express from 'express';

const chatRoutes = express.Router();

chatRoutes.route('/').get((_, res) => res.send('chat by userId or meeting id'));

export default chatRoutes;
