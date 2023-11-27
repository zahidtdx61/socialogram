const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        // find a user and establish the identity
        User.findOne({ email: email })
            .catch((err) => {
                console.log('Error in finding user => Passport');
                return done(err);
            })
            .then((user) => {
                if (!user || user.password != password) {
                    console.log('Invalid username/password');
                    return done(null, false);
                }

                return done(null, user);
            });
    }
));

// serializing user to decide which key is kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});


// deserialize tthe use
passport.deserializeUser(function (id, done) {
    User.findById(id)
        .catch((err) => {
            console.log('Error in finding user => Passport');
            return done(err);
        })
        .then((user) => {
            return done(null, user);
        });
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass the request to controller
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/user/sign-in');
};

passport.setAuthenticatedUser = function (req, res, next){
    if(req.isAuthenticated()){
        // req.user contain current signed in use from the session cookie and we are just sending this to the locals 
        res.locals.user = req.user;
    }

    next();
}


module.exports = passport;