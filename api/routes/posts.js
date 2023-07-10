import { Router } from 'express';
const router = Router();

import checkAuth from '../middleware/checkAuth.js';
import { authGetAllPosts, 
        unauthGetAllPosts, 
        makePost, 
        getPost, 
        editPost, 
        deletePost
} from '../controllers/posts.js';

/**
 * @openapi
 * /posts/authenticated:
 *   get:
 *     summary: Get all posts (authenticated)
 *     description: Retrieve all posts when the user is authenticated
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostListResponse'
 *       '401':
 *         description: Authentication failed
 *       '500':
 *         description: Server error
 */

router.get("/authenticated", checkAuth, authGetAllPosts);

router.get("/unauthenticated", unauthGetAllPosts);

router.post('/', checkAuth, makePost);

router.get("/:postId", getPost);

router.patch('/:postId', checkAuth, editPost);

router.delete('/:postId', checkAuth, deletePost);

export default router;