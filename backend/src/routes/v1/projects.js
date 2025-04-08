import express from 'express';
import { createProjectController, getProjectTree } from '../../controllers/projectController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', isAuthenticated, createProjectController);

router.get('/:projectId/tree', isAuthenticated, getProjectTree);

export default router;