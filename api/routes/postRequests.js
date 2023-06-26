import { Router } from 'express';
const router = Router();
import checkAuth from '../middleware/checkAuth.js';

import { getAllPostRequests, makePostRequest, getPostRequest, deletePostRequest } from '../controllers/postRequests.js';

router.get("/", checkAuth, getAllPostRequests);

router.post("/", checkAuth, makePostRequest);

router.get("/:postRequestId", checkAuth, getPostRequest);

router.delete('/:postRequestId', checkAuth, deletePostRequest);

export default router;