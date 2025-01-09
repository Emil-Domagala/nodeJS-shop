const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect('/');
    return;
  }
  Product.findById(prodId, (product) => {
    if (!product) {
      res.redirect('/');
      return;
    }
    res.render('admin/edit-product', {
      product: product,
      pageTitle: 'Edit Detail',
      path: '/admin/edit-product',
      editing: editMode,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const updatedProduct = new Product(id, title, imageUrl, description, price);
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.getProduct = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'admin Products',
      path: '/admin/products',
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.productId;

  Product.deleteProduct(id);
  res.redirect('/admin/products');
};
