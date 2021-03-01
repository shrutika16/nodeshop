const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getproducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'product list',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getproduct = (req, res, next) => { 
    const prodID = req.params.productId;
    console.log(prodID);
    Product.findByPk(prodID)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
}