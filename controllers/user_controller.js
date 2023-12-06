//require db schema to use database
const { use } = require('passport');
const User = require('../models/user');

// render profile page
module.exports.profile = async function (req, res) {
    try {
        let userId = req.params.id;
        let user = await User.findById(userId);

        return res.render('user_profile', {
            title: 'Profile',
            userProfile: user
        });
    } catch (err) {
        console.log(`Error : ${err}`);
        return res.status(404).render('404_not_found', { title: 'Not Found' });
    }
}

// render sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect(`/user/profile/${req.user.id}`);
    }

    return res.render('user_sign_up', {
        title: 'Socialogram | Sign Up'
    });
}

// render sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect(`/user/profile/${req.user.id}`);
    }

    return res.render('user_sign_in', {
        title: 'Socialogram | Sign In'
    });
}

// get sign up data
module.exports.create = async function (req, res) {
    try {
        if (req.body.password == req.body.confirm_password) {
            let user = await User.findOne({ email: req.body.email });

            if (!user) {
                await User.create(req.body);
                return res.redirect('/user/sign-in');
            } else {
                return res.redirect('back');
            }
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log(`Error : ${err}`);
        return res.redirect('back');
    }
}

// update user data
module.exports.update = async function (req, res) {
    try {
        if (req.user.id == req.params.id) {
            await User.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                email: req.body.email
            });

            return res.redirect('back');
        } else {
            return res.status(401).render('unauthorized', { title: 'Unauthorized' });
        }
    } catch (err) {
        console.log(`Error : ${err}`);
        return res.redirect('back');
    }
}

// get sign in and a create a session
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in successfully !!!');
    return res.redirect('/');
}

// user log out
module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'You have Logged out !!!');
        res.redirect('/');
    });
}
