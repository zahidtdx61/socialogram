const express = require('express');
const port = 8000;
const app = express();

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