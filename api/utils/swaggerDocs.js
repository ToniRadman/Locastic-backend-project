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
 *   responses:
 *     Unauthorized:
 *       description: Unauthorized access
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * components:
 *   responses:
 *     InternalServerError:
 *       description: Internal server error occurred
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * components:
 *   responses:
 *     SuccessResponse:
 *       description: Successful operation response
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SuccessResponse'
 */

/**
 * @openapi
 * components:
 *   responses:
 *     NotFoundResponse:
 *       description: Resource not found response
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotFoundResponse'
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

/**
 * @openapi
 * components:
 *   schemas:
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Success message
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     NotFoundResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message indicating the resource was not found
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 */