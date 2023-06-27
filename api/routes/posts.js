import { Router } from 'express';
const router = Router();

import checkAuth from '../middleware/checkAuth.js';
import { authGetAllPosts, 
        unauthGetAllPosts, 
        makePost, 
        getPost, 
        editPost, 
        deletePost } from '../controllers/posts.js';

router.get("/authenticated", checkAuth, authGetAllPosts);

router.get("/unauthenticated", unauthGetAllPosts);

router.post('/', checkAuth, makePost);

router.get("/:postId", getPost);

router.patch('/:postId', checkAuth, editPost);

router.delete('/:postId', checkAuth, deletePost);

export default router;