import express from 'express';
import { pingCheck } from '../../controllers/pingController.js';
import userRouter from "./users.js"
import projectRouter from './projects.js';
const router = express.Router();

router.use('/ping', pingCheck);

router.use('/projects', projectRouter);

router.use('/users', userRouter);

export default router;