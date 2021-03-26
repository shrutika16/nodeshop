const models = require('../models');

exports.getProducts = (req, res, next) => { 
    // Product.findAll()
  req.user.getProducts()
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
  req.user.createProduct({
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
    models.Product.findByPk(prodId)
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

exports.editProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedDescription = req.body.description;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;

  models.Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.description = updatedDescription;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(
        err => {
            console.log(err)
    });
}


exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
    models.Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    }).then(result => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
}