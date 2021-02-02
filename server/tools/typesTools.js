const typesJson = require('../json/types.json');

exports.typesMatch = function(types) {
  let match = true;
  for (let i = 0; i < types.length && match === true; i++) {
	  let exist = false
	  for (let j = 0; j < typesJson.length && exist === false; j++) {
	  	if (types[i] === typesJson[j])
	  		exist = true;
	  }
	  if (exist === false)
	  	match = false
	}
  return match;
};

