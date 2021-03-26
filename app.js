const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

// const errorController = require('./controllers/error');
// const sequelize = require('./util/database');
// const Product = require('./models/product');
const models = require('./models');
// const Cart = require('./models/cart');
// const cartItem = require('./models/cartItem');
// const Order = require('./models/order');
// const orderItem = require('./models/orderItem');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { Console } = require('console');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    models.User.findByPk(1)
        .then(user => {
            req.user = user;
            next()
        }).catch(err => {
            console.log(err);
        })
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

models.User.findByPk(1)
    .then(user => {
       return user
    })
    .then(user => {
        if (!user) {
           return models.User.create({ name: "Shrutika Dumbre", email: "shrutika16dumbre@gmail.com", password: "123456" });
        }
        return user;
    }).then(user => {
        // return user.createCart()
        app.listen(3030)
    })
    .catch(err => { console.log(err); })
// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// Product.belongsToMany(Cart, { through: cartItem });
// Product.belongsToMany(Order, { through: orderItem });
// User.hasMany(Product);
// User.hasOne(Cart);
// User.hasMany(Order);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, {through: cartItem});
// Order.belongsTo(User);
// Order.belongsToMany(Product, { through: orderItem });


//  app.listen(3030);
// sequelize
//     // .sync({force: true})
//     .sync()
//     .then(result => {
//         console.log(models.user.findAll());
//         // return User.findByPk(1);
//         // app.listen(3000);
//     }).then(user => {
//         if (!user) {
//            return User.create({ name: "Shrutika Dumbre", email: "shrutika16dumbre@gmail.com", password: "123456" });
//         }
//         return user;
//     }).then(user => {
//         return user.createCart()
//         // app.listen(3030)
//     })
//   .catch(err => {
//     console.log(err);
//   });