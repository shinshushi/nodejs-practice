require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
var userRoutes = require('./routes/user.route');
var authRoutes = require('./routes/auth.route');
var productRouter = require('./routes/product.route');

var authMiddleware = require('./middleware/auth.middleware');

var port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index', {
        name: 'Sinh'
    });
});

app.use('/users', authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRouter);
app.listen(port, function(){
    console.log("Server listening on port " + port);
});