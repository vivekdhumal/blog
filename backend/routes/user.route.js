import express from 'express';
import { getUsers, createUser, updateUser, deleteUser, getUserById} from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

router.get('/', verifyToken, getUsers);
router.get('/:userId', verifyToken, getUserById);
router.post('/', verifyToken, createUser);
router.put('/:userId', verifyToken, updateUser);
router.delete('/:userId?', verifyToken, deleteUser);

export default router;