/**
 * @openapi
 * components:
 *   responses:
 *     UserListResponse:
 *       description: Response containing a list of users
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserListResponse'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     UserListResponse:
 *       type: object
 *       properties:
 *         count:
 *           type: integer
 *           description: Number of users in the response
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 */