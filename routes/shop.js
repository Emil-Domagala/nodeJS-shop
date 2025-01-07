const path = require('path');

const express = require('express');

const prodControllers = require('../controllers/products');

const router = express.Router();

router.get('/', prodControllers.getAllProdToShop);

module.exports = router;
