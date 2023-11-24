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
    // TO DO Later
}

// get sign in and a create a session
module.exports.create = function (req, res) {
    // TO DO Late
}
