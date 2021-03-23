const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');
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
  req.user.getCart()
    .then(cart => { 
      return cart.getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products : products
          });    
        })
    })
    .catch(err => { console.log(err); })
  
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let featchedCart;
  let newQuantity = 1;

  req.user.getCart()
    .then(cart => {
      featchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return featchedCart.addProduct(product, {
        through: { quantity : newQuantity }
      })
    })
    .then(() => {
      res.redirect('/cart')
    })
    .catch(err => { console.log(err) })
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: {id : prodId}}) //7506218677
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => { console.log(err); })
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({include : ['products']})
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => { console.log(err) });
  
};

exports.postOrder = (req, res, next) => {
  let featchedCart;
  req.user
    .getCart()
    .then(cart => {
      featchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          order.addProducts(products.map(product => {
            product.orderItem = { quantity: product.cartItem.quantity }
            return product;
          }))
        })
        .then(result => {
          return featchedCart.setProducts(null);
        })
        .then(result => {     
          res.redirect('/orders');
        })
        .catch(err => { console.log(err)})
    })
    .catch(err => { console.log(err) })
};

