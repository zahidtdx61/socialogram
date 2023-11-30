const Post = require('../models/post');

module.exports.home = function (req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .then((posts) => {
            return res.render('home', {
                title: 'Socialogram | Home',
                posts: posts
            });
        })
        .catch((err) => {
            if (err) {
                console.log('Somthing went wrong. Not getting details. - Homepage');
                return;
            }
        });
}