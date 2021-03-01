const Product = require('../models/product');

exports.getProducts = (req, res, next) => { 
    Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'admin product',
        path: '/admin/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProducts = (req, res, next) => { 
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;

    Product.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl
    }).then(result => {
        console.log('Created Product');
      res.redirect('/admin/products');
    }).catch(
        err => {
            console.log(err)
    });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    console.log(prodId)
    Product.findByPk(prodId)
    .then(product => {
      res.render('admin/edit-product', {
        product: product,
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
      });
    })
    .catch(err => {
      console.log(err);
    });
}