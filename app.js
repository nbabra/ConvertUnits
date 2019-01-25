var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Please use /units/si');
});

const convert = require('./convert.js'); //importing evaluateData function from convert.js

app.get("/units/si", function(req, res) { //get request

    var unit = req.query.units; //query parameter
 
    //function call and json formatting with response to client
    res.send(JSON.stringify( convert.evaluateUnits(unit), null, 2));

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Listening on port %d', PORT);
});


