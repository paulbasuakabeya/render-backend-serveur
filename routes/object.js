import express from 'express';
import { createObject, getObjects, updateObject, deleteObject } from '../controllers/object.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createObject);
router.get('/', auth, getObjects);
router.put('/:id', auth, updateObject);
router.delete('/:id', auth, deleteObject);

export default router;
