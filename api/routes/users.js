import express from 'express';
const router = express.Router();
import checkAuth from '../middleware/checkAuth.js';

import { getAllUsers, registerUser, LoginUser, getUser, deleteUser } from '../controllers/users.js';

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserListResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

router.get("/", checkAuth, getAllUsers);

/**
 * @openapi
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided information.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserCreatedResponse'
 *       409:
 *         description: User with the provided email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConflictResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

router.post("/register", registerUser);

/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate a user with the provided email and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserRequest'
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginUserResponse'
 *       401:
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

router.post("/login", LoginUser);

/**
 * @openapi
 * /users/{userId}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by their ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundResponse'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

router.get("/:userId", checkAuth, getUser);

/**
 * @openapi
 * /users/{userId}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a user by their ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

router.delete('/:userId', checkAuth, deleteUser);

export default router;