import express from 'express';
import { createCommunication, getCommunications } from '../controllers/communication.js';

const router = express.Router();

router.post('/', createCommunication);
router.get('/', getCommunications);

export default router;
