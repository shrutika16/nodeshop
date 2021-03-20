const Product = require('../models/product');
const Cart = require('../models/cart');
// const User = require('../models/user');
// const rp = require('request-promise');
// const url = 'https://unsold.com/';

// exports.getIndex = (req, res, next) => {
  
//   rp(url)
//     .then(function (html) {
//        console.log($('form > input', html).length);
//       // console.log(html);
//     //  res.end(JSON.stringify(html));
//     })
//     .catch(function(err){
//       //handle error
//   });
// };


// exports.getIndex = (req, res, next) => {
//   User.findAll()
//     .then(users => {
//       res.end(JSON.stringify(users));
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };


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
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Orders'
  });
};

exports.postCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Orders'
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
