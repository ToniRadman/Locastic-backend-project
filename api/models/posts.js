import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    content: {type: String, required: true},
    timestamp: Date,
    author: String,
    allowed: {type: Boolean, default: false}
});

export default mongoose.model('Post', postSchema);