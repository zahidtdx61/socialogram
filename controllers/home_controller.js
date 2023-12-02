const Post = require('../models/post');
const User = require('../models/user');

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
            User.find({})
                .then((users) => {
                    return res.render('home', {
                        title: 'Socialogram | Home',
                        posts: posts,
                        all_users: users
                    });
                })
                .catch((err) => {
                    console.log(`Somthing went wrong - Homepage : ${err}`);
                    return;
                });
        })
        .catch((err) => {
            if (err) {
                console.log(`Somthing went wrong. Not getting details. - Homepage : ${err}`);
                return;
            }
        });
}