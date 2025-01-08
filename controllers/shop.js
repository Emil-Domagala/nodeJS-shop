const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};

exports.getAllProd = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    });
  });
};
exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    // prods: products,
    pageTitle: 'Your Cart',
    path: '/cart',
  });
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    // prods: products,
    pageTitle: 'Your Orders',
    path: '/orders',
  });
};
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    // prods: products,
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: 'Product Detail',
      path: '/products',
    });
  });
};
