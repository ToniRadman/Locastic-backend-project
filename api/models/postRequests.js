import mongoose from 'mongoose';

const postRequestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true},
    allowed: {type: Boolean, default: false}
});

export default mongoose.model('PostRequest', postRequestSchema);