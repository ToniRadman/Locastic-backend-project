import mongoose from 'mongoose';

/**
 * @openapi
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - email
 *          - password
 *          - firstName
 *          - lastName
 *        properties:
 *          _id:
 *            type: string
 *            description: The ID of the user.
 *          email:
 *            type: string
 *            format: email
 *            description: The email address of the user.
 *          password:
 *            type: string
 *            description: The password of the user.
 *          firstName:
 *            type: string
 *            description: The first name of the user.
 *          lastName:
 *            type: string
 *            description: The last name of the user.
 *          role:
 *            type: string
 *            enum: [User, Admin, Blogger]
 *            default: User
 *            description: The role of the user.
 *          numberOfPosts:
 *            type: number
 *            default: 0
 *            description: The number of posts created by the user.
 */

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: ["User", "Admin", "Blogger"], default: "User"},
    numberOfPosts: { type: Number, default: 0}
});

export default mongoose.model('User', userSchema);