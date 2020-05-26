var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var layouts = require('express-ejs-layouts');
const session = require('express-session');



const mariadb = require('mariadb/callback');
const db = mariadb.createConnection({host: 'eagle.cdm.depaul.edu',
user: 'spate313', password: 'spate313', 
database: 'usavedb'});

// connect to database
db.connect((err) => {
  if (err) {
console.log("Unable to connect to database due to error: " + err);
	res.render('error');
  } else
	{
    console.log("Connected to DB");
  }
});
global.db = db;


//const cart = [];
//global.cart = cart;




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var contactRounter = require('./routes/contact');
var helpRouter = require('./routes/help');
var privacyRouter = require('./routes/privacy');
var productRouter = require('./routes/product');
var categoryRouter = require('./routes/category');
var customerRouter = require('./routes/customer');
var supplierRouter = require('./routes/supplier');
var orderdetailRouter = require('./routes/orderdetail');
var saleorderRouter = require('./routes/saleorder');
var subscriptionRouter = require('./routes/subscription');
var searchRouter = require('./routes/search');
var reportRouter = require('./routes/report');
var catalogRouter = require('./routes/catalog');


var app = express();

app.use(session({secret: 'UsaveAppSecret'}));
app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRounter);
app.use('/help', helpRouter);
app.use('/privacy', privacyRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/customer', customerRouter);
app.use('/supplier', supplierRouter);
app.use('/orderdetail', orderdetailRouter);
app.use('/saleorder', saleorderRouter);
app.use('/subscription', subscriptionRouter);
app.use('/search', searchRouter);
app.use('/report', reportRouter);
app.use('/catalog', catalogRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
