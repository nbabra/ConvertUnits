var map = new Map();

function initMap(map) {

	map.set("minute", "60 s");
	map.set("min", "60 s");
		
	map.set("hour", "3600 s");
	map.set("h", "3600 s");
		
	map.set("day", "86400 s");
	map.set("d", "86400 s");
		
	map.set("hectare", "10000 m^2");
	map.set("ha", "10000 m^2");
		
	map.set("degree", "π/180 rad");
	map.set("°", "π/180 rad");
		
	map.set("arcminute", "π/10800 rad");
	map.set("'", "π/10800 rad");
		
	map.set("arcsecond", "π/648000 rad");
	var unit = '"' + "";
	map.set(unit, "π/648000 rad");
		
	map.set("litre", "0.001 m^3");
	map.set("L", "0.001 m^3");
		
	map.set("tonne", "1000 kg");
	map.set("t", "1000 kg");

}

function evalFactor(exp) {

	var split = exp.split(/(?<=[^\d.-])(?=[^\D.-])|(?<=[^\D.-])(?=[^\d.-])/);

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

		var strArr = str.split(myRegExp);
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

		for (var i = 0; i < strArr.length; i++) {

			resType += strArr[i];

		}

		var resMult = "";

		for (var i = 0; i < multArr.length; i++) {

			if (multArr[i].includes("π") ) {

				multArr[i] = multArr[i].replace("π", "314");

			}

			resMult += multArr[i];

		}

		var f = evalFactor(resMult);

		var resMap = new Map();

		resMap.set("unit_name", resType);
		resMap.set("multiplication_factor", parseFloat(f.toFixed(14)));

		return resMap;

	}

};