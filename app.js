const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user');

const app = express();
app.set('view engine', 'ejs');       //to define our templating engine to server
app.set('views', 'views');           //to show the location of template files

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('61c91956ec7a272dfe8562f3')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://amirhosein:amirhosein@cluster0.ykhje.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));