const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);

        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            await post.save();

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log(`Error : ${err}`);
        return;
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        let post = await Post.findById(comment.post);

        if ((req.user.id == comment.user) || (req.user.id == post.user)) {
            let postId = comment.post;

            await Comment.findByIdAndDelete(req.params.id);
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log(`Error : ${err}`);
        return;
    }
}


