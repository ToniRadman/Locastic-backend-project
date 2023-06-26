import express from 'express';
const router = express.Router();
import checkAuth from '../middleware/checkAuth.js';

import { getAllUsers, registerUser, LoginUser, getUser, deleteUser } from '../controllers/users.js';

router.get("/", checkAuth, getAllUsers);

router.post("/register", registerUser);

router.post("/login", LoginUser);

router.get("/:userId", checkAuth, getUser);

router.delete('/:userId', checkAuth, deleteUser);

export default router;