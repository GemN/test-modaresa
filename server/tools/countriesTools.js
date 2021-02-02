const countriesJson = require('../json/countries.json');

exports.countryExist = function(country) {
  let exist = false;
  for (let i = 0; i < countriesJson.length && exist === false; i++) {
  	if (countriesJson[i].name === country)
  		exist = true;
  }
  return exist;
};

