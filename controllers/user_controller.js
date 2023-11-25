//require db schema to use database
const User = require('../models/user');

// render profile page
module.exports.profile = function (req, res) {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id)
            .then((user) => {
                if (user) {
                    return res.render('user_profile', {
                        title: "User Profile",
                        user: user
                    });
                } else {
                    return res.redirect('/user/sign-in');
                }
            });
    } else {
        return res.redirect('/user/sign-in');
    }
}

// render sign up page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: 'Socialogram | Sign Up'
    });
}

// render sign in page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: 'Socialogram | Sign In'
    });
}

// get sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    } else {
        User.findOne({ email: req.body.email })
            .catch((err) => {
                console.log('Error in user sign up. Please try later.'); return;
            })
            .then((user) => {
                if (!user) {
                    User.create(req.body)
                        .catch((err) => {
                            if (err) { console.log('Error in user sign up. Please try later.'); return; }
                        })
                        .then((user) => {
                            return res.redirect('/user/sign-in')
                        });
                } else {
                    return res.redirect('back');
                }
            });
    }
}

// get sign in and a create a session
module.exports.createSession = function (req, res) {
    // steps to authenticate

    // find the user
    User.findOne({ email: req.body.email })
        .catch((err) => {
            console.log('Something is wrong. Please try later.');
            return;
        })
        .then((user) => {
            // user handel not found
            if (!user) {
                console.log('User not found !!!');
                return res.redirect('back');
            } else {
                // user handel found
                // now handel password
                // handel when password doesn't match
                if (user.password != req.body.password) {
                    console.log('Password not matched');
                    return res.redirect('back');
                }
                // handel session creation

                res.cookie('user_id', user.id);
                return res.redirect('/user/profile')
            }
        });
}
