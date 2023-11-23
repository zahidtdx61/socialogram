const express = require('express');
const port = 8000;
const app = express();

app.get('/', function(req, res){
  console.log('User visited');
});

app.listen(port, function(err){
  if(err){
    console.log(`Error in running server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});