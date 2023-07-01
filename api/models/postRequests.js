import mongoose from 'mongoose';

/**
 * @openapi
 * components:
 *   schemas:
 *     PostRequest:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the post request.
 *         post:
 *           type: string
 *           description: The ID of the associated blog post.
 *         allowed:
 *           type: boolean
 *           description: Specifies if the post request is allowed or not.
 */

const postRequestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true},
    allowed: {type: Boolean, ref: 'Post', required: true}
});

export default mongoose.model('PostRequest', postRequestSchema);