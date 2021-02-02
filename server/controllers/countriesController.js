const countriesJson = require('../json/countries.json');

exports.get = function(req, res) {
  res.send(countriesJson);
};

