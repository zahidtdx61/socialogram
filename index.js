const express = require('express');
const cookieParse = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const port = 8000;
const app = express();

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');



// define static folder
app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// body parser
app.use(express.urlencoded());
app.use(cookieParse());

// adding veiw engine
app.set('view engine', 'ejs');
app.set('views', './views');

// setting up session parameters
app.use(session({
    name: 'socialogram',
    // change the secret before deployment in production mode
    secret: 'nothingspecial',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    }
}));

// use passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});