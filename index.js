const express = require('express');
const cookieParse = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const port = 8000;
const app = express();

// define static folder
app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// body parser
app.use(express.urlencoded());
app.use(cookieParse());

//use express router
app.use('/', require('./routes'));

// adding veiw engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});