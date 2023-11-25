//require db schema to use database
const User = require('../models/user');

// render profile page
module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: 'Profile'
    });
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
                if (err) { console.log('Error in user sign up. Please try later.'); return; }
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
    // TO DO Late
}
