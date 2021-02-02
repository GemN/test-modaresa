var express = require('express');
var router = express.Router();
var brandsController = require('../controllers/brandsController');

router.get('/', brandsController.get);
router.post('/', brandsController.create);
router.delete('/', brandsController.delete);

module.exports = router;
