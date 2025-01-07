const path = require('path');

const express = require('express');

const prodControllers = require('../controllers/products');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', prodControllers.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', prodControllers.postAddProduct);

module.exports = router;
