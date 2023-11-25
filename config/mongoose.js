const mongoose = require('mongoose');

// connecting to localhost
mongoose.connect('mongodb://localhost/socialogram_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to mongoDB"));

db.once('open', function(){
    console.log('Connected to database :: MongoDB');
});

module.exports = db;