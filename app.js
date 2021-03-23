const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

// const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const cartItem = require('./models/cart-item');
const Order = require('./models/order');
const orderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next()
        }).catch(err => {
            console.log(err);
        })
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: cartItem});
Product.belongsToMany(Cart, { through: cartItem });

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: orderItem });
Product.belongsToMany(Order, { through: orderItem });

//  app.listen(3030);
sequelize
    // .sync({force: true})
    .sync()
    .then(result => {
        return User.findByPk(1);
        // app.listen(3000);
    }).then(user => {
        if (!user) {
           return User.create({ name: "Shrutika Dumbre", email: "shrutika16dumbre@gmail.com", password: "123456" });
        }
        return user;
    }).then(user => {
        // return user.createCart()
        app.listen(3030)
    })
  .catch(err => {
    console.log(err);
  });