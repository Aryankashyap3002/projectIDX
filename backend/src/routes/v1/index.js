import express from 'express';
import { pingCheck } from '../../controllers/pingController.js';
import userRouter from "./users.js";
import channelRouter from './channel.js';
import memberRouter from './members.js';
import messageRouter from './messages.js';
import paymentRouter from './payment.js';
import workspaceRouter from './workspaces.js';

const router = express.Router();

router.use('/ping', pingCheck);
router.use('/users', userRouter);
router.use('/workspaces', workspaceRouter);
router.use('/channels', channelRouter);
router.use('/members', memberRouter);
router.use('/messages', messageRouter);
router.use('/payments', paymentRouter);
// Removed direct /projects route since it's now nested under workspaces

export default router;