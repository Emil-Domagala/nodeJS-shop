const path = require('path');

const express = require('express');

const adminControllers = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminControllers.getAddProduct);
// router.get('/edit-product', adminControllers.getAddProduct);
router.get('/products', adminControllers.getProduct);

// /admin/add-product => POST
router.post('/add-product', adminControllers.postAddProduct);

module.exports = router;
