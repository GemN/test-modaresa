const db = require('../db/connection');
const brands = db.get('brands');
const countriesTools = require('../tools/countriesTools');
const typesTools = require('../tools/typesTools');

exports.get = function(req, res) {
	brands.find().then((brands) => {
        res.json(brands);
    }).catch((error) => {
    	res.status(500);
    	res.send(error);
    });
}

exports.create = function(req, res) {
	let brand = {
		name: req.body.name,
		createdAt: new Date,
		type: req.body.type,
		country: req.body.country,
		description: req.body.description
	}
	if (!brand.name)
	{
		res.status(400);
		res.send("Missing brand name.");
	}
	else if (!brand.type || brand.type.length === 0)
	{
		res.status(400);
		res.send("Missing brand type (at least one is required).");
	}
	else if (!typesTools.typesMatch(brand.type))
	{
		res.status(400);
		res.send("Brand types does not match.");
	}
	else if (!brand.country)
	{
		res.status(400);
		res.send("Missing brand country.");
	}
	else if (!countriesTools.countryExist(brand.country))
	{
		res.status(400);
		res.send("Country does not exist.");
	}
	else
	{
	    brands.insert(brand).then((brand) => {
	        res.json(brand);
	    }).catch((error) => {
	        res.status(500);
	        res.send(error);
	    })
	}
}

exports.delete = function(req, res) {
	let brandId = req.body.brandId;
	if (!brandId)
	{
		res.status(400);
		res.send("Missing brand id.");
	}
	else {
		brands.remove({
			_id: brandId
		}).then((result) => {
	        res.json({});
	    }).catch((error) => {
	    	res.status(500);
	    	res.send(error);
	    });
	}
}
