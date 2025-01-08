const fs = require('fs');
const path = require('path');
const rootPath = require('../util/path');
const Cart = require('./cart');

const p = path.join(rootPath, 'data', 'products.json');

const getProdFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProdFromFile((products) => {
      if (this.id) {
        const existingProdIndex = products.findIndex((item) => item.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProdIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => console.log(err));
        return;
      }

      this.id = Math.trunc(+Math.random() * 100000000).toString();
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => console.log(err));
    });
  }

  static fetchAll(cb) {
    getProdFromFile(cb);
  }

  static findById(id, cb) {
    getProdFromFile((products) => {
      const product = products.find((elem) => elem.id === id);
      cb(product);
    });
  }

  static deleteProduct(id) {
    getProdFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const newProducts = products.filter((item) => item.id !== id);
      fs.writeFile(p, JSON.stringify(newProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
        console.log(err);
      });
    });
  }
};
