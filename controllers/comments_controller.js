const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function (req, res) {
    Post.findById(req.body.post)
        .then((post) => {
            if (post) {
                Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                })
                    .then((comment) => {
                        post.comments.push(comment);
                        post.save();

                        return res.redirect('back');
                    })
                    .catch((err) => {
                        if (err) {
                            console.log('Something went wrong !!! Can not create the comment');
                            return;
                        }
                    });
            }
        })
        .catch((err) => {
            if (err) {
                console.log('Something went wrong !!! Can not find relevant post');
                return;
            }
        })
}

module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id)
        .then((comment) => {
            if (comment.user == req.user.id) {
                let postId = comment.post;
                Comment.findByIdAndDelete(req.params.id)
                    .catch((err) => {
                        console.log(`Something went wrong while deleting comment : ${err}`);
                        return res.redirect('back');
                    });

                Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
                    .then(() => {
                        return res.redirect('back');
                    })
                    .catch((err) => {
                        console.log(`Something went wrong while pulling comment from post : ${err}`);
                        return res.redirect('back');
                    });
            } else {
                return res.redirect('back');
            }

        })
        .catch((err) => {
            console.log(`Something went wrong while deleting comment : ${err}`);
            return res.redirect('back');
        });
}


