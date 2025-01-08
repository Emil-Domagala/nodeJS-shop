const fs = require('fs');
const path = require('path');
const rootPath = require('../util/path');

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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.trunc(+Math.random() * 100000000).toString();
    getProdFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
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
};
