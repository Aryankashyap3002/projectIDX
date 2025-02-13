import express from 'express'
import V1Router from './v1/index.js'

const router = express.Router();


router.use('/v1', V1Router);

export default router;