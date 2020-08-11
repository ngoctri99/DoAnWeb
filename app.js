var createError = require('http-errors');
var express = require('express');
const expbs = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var accountRouter = require('./routes/accounts');
var pdfRouter = require('./routes/pdf');
var vipRouter = require('./routes/vip');
var categoryRouter = require('./routes/categories');


var app = express();
app.set('view engine', 'hbs');
app.engine('hbs', expbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layout')
}));

require('./middlewares/session.mdw')(app);
require('./middlewares/locals.mdw')(app);

hbs.registerPartials(__dirname + '/views/partials', function(err) {});

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/post', postsRouter);
app.use('/account', accountRouter);
app.use('/pdf', pdfRouter);
app.use('/vip', vipRouter);
app.use('/category',categoryRouter);



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