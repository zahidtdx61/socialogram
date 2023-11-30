const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    // trace user who made this comment
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // trace post on which the comment was made
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;