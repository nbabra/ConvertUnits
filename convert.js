var map = new Map();

//Initialize map with the conversion rate and the updated units as the value
function initMap(map) {

	map.set("minute", "60 s");
	map.set("min", "60 s");
		
	map.set("hour", "3600 s");
	map.set("h", "3600 s");
		
	map.set("day", "86400 s");
	map.set("d", "86400 s");
		
	map.set("hectare", "10000 m^2");
	map.set("ha", "10000 m^2");
		
	map.set("degree", "314/180 rad");
	map.set("°", "314/180 rad");
		
	map.set("arcminute", "314/10800 rad");
	map.set("'", "314/10800 rad");
		
	map.set("arcsecond", "314/648000 rad");
	var unit = '"' + "";
	map.set(unit, "314/648000 rad");
		
	map.set("litre", "0.001 m^3");
	map.set("L", "0.001 m^3");
		
	map.set("tonne", "1000 kg");
	map.set("t", "1000 kg");

}

function evalFactor(exp) {

	var split = exp.split(/(?<=[^\d.-])(?=[^\D.-])|(?<=[^\D.-])(?=[^\d.-])/); //split string on every non number, preserving delimiters

	var res = "";

	for (var i = 0; i < split.length; i++) {

		if (split[i] === "314") {

			split[i] = Math.PI + "";

		}

		res += split[i] + " ";

	}

	return eval(res);

}

module.exports = {

	evaluateUnits: function (str) {

		var myRegExp = new RegExp(/(?<=[^a-z])(?=[^A-Z])|(?<=[^A-Z])(?=[^a-z])/)

		var strArr = str.split(myRegExp); //split string on every non letter, preserving delimiters
		var multArr = strArr.slice(0);

		initMap(map);

		for (var i = 0; i < strArr.length; i++) {

			if (map.has(strArr[i])) {

				var output = map.get(strArr[i]).split(" ");
				multArr[i] = output[0];
				strArr[i] = output[1];

			}

		}

		var resType = "";

		for (var i = 0; i < strArr.length; i++) { //concatenate unit string

			resType += strArr[i];

		}

		var resMult = "";

		for (var i = 0; i < multArr.length; i++) { //concatenate multiplication string

			resMult += multArr[i];

		}

		var f = parseFloat(evalFactor(resMult)); //evaluate arithmetic expression for mult factor
		f = f.toFixed(14).replace(/\.?0+$/,"").replace(/^[0\.]/, ""); // fix to 14 dec places, remove scientific notation, and remove leading 0 before dec point

		var resMap = new Map();

		resMap.set("unit_name", resType);
		resMap.set("multiplication_factor", f); 

		return resMap;

	}

};