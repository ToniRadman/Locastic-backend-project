import { Router } from 'express';
const router = Router();

import checkAuth from '../middleware/checkAuth.js';

import { getAllPostRequests, makePostRequest } from '../controllers/postRequests.js';

router.get("/", checkAuth, getAllPostRequests);

router.post("/", checkAuth, makePostRequest);

export default router;