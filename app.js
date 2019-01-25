var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Please use /units/si');
});

const convert = require('./convert.js');

app.get("/units/si", function(req, res) {

    var unit = req.query.units;
    var resultMap = new Map();

    resultMap = convert.evaluateUnits(unit);

    var JsonData = {};

    JsonData = {
                "unit_name":resultMap.get('unit_name'), 
                "multiplication_factor":resultMap.get('multiplication_factor')
                };

    res.send(JSON.stringify(JsonData, null, 2));

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Listening on port %d', PORT);
});


