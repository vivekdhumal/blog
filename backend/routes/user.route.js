import express from 'express';
import { getUsers, createUser, updateUser, deleteUser, getUserById} from '../controllers/user.controller.js';
const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId?', deleteUser);

export default router;