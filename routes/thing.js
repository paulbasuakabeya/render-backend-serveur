import express from 'express';
import { createThing, getThings } from '../controllers/thing.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createThing);
router.get('/', getThings);

export default router;
