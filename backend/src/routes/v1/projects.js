import express from 'express';
import { createProjectController, getProjectTree, getAllProjectsController } from '../../controllers/projectController.js';

const router = express.Router();

router.post('/', createProjectController);
router.get('/', getAllProjectsController); 
router.get('/:projectId/tree', getProjectTree);

export default router;