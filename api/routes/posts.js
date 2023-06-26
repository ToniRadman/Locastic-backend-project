import { Router } from 'express';
const router = Router();

import checkAuth from '../middleware/checkAuth.js';
import { getAllPosts, makePost, getPost, editPost, deletePost } from '../controllers/posts.js';

router.get("/", getAllPosts);

router.post('/', checkAuth, makePost);

router.get("/:postId", getPost);

router.patch('/:postId', checkAuth, editPost);

router.delete('/:postId', checkAuth, deletePost);

export default router;