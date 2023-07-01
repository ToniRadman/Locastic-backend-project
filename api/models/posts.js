import mongoose from 'mongoose';

/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the blog post.
 *         title:
 *           type: string
 *           description: The title of the blog post.
 *         content:
 *           type: string
 *           description: The content or body of the blog post.
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the blog post was created.
 *         author:
 *           type: string
 *           description: The ID of the author who created the blog post.
 *         allowed:
 *           type: boolean
 *           description: Specifies if the post is allowed or not.
 */

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    content: {type: String, required: true},
    timestamp: Date,
    author: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    allowed: {type: Boolean, ref: 'PostRequest', default: false}
});

export default mongoose.model('Post', postSchema);