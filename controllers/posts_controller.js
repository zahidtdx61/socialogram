const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
        .catch((err) => {
            if (err) { console.log('Error in creating post!!!'); return; }
        })
        .then((post) => {
            return res.redirect('back');
        });
}

module.exports.destroy = function (req, res) {
    Post.findById(req.params.id)
        .then((post) => {
            if(post.user == req.user.id){
                Post.findByIdAndDelete(post._id)
                    .catch((err) => {
                        console.log(`Something went wrong during deleting post !!!: ${err}`);
                        return res.redirect('back');
                    });

                Comment.deleteMany({post: req.params.id})
                    .then(()=>{
                        return res.redirect('back');
                    })
                    .catch((err) => {
                        console.log(`Something went wrong during deleting all comments of a post !!!: ${err}`);
                        return res.redirect('back');
                    });
            }else{
                return res.redirect('back');
            }
        })
        .catch((err) => {
            console.log(`Something went wrong during deleting post !!!: ${err}`);
            return res.redirect('back');
        });
}