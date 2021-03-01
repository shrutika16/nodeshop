const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/products', shopController.getproducts);
router.get('/products/:productId', shopController.getproduct);

module.exports = router;