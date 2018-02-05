var express     = require('express');
var app         = express();
var passport    = require('passport');
var session     = require('express-session');
var bodyParser  = require('body-parser');
var cookieParser = require('cookie-parser');
var exphbs      = require('express-handlebars');
var flash       = require('connect-flash');

app.use(flash());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ 
    secret: 'secret',
    resave: true, 
    saveUninitialized:true, 
    cookie : { httpOnly: true, maxAge: 2419200000 }
}));
app.use(passport.initialize()); 
app.use(passport.session());

app.use(express.static(__dirname + '/node_modules/papercss/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/static'));

app.set('views', './views')
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'paper',
    helpers: {
        eq: function (a, b, options) {   if(a == b) { return options.fn(this); } return options.inverse(this);},
        neq: function (a, b, options) {   if(a != b) { return options.fn(this); } return options.inverse(this);},
        minus: function(a, b, options) { return a - b; },
        plus: function(a, b, options) { return a + b; },
        contains: function(a, b, options) { return (a.indexOf(b) >= 0 ? options.fn(this) : options.inverse(this)); }
    }    
}));
app.set('view engine', '.hbs');

require('./models/user')();
require('./models/question')();
require('./models/answer')();
require('./models/userquestions')();

require('./passport')(passport);
require('./controllers/register').init(app, passport);
require('./controllers/home')(app, passport);
require('./controllers/login').init(app, passport);
require('./controllers/survey').init(app, passport);
require('./controllers/logout')(app, passport);
require('./controllers/question')(app,passport);
 
var port = process.env.PORT || 1337;

app.listen(port, function(err) {
    if (!err)
        console.log("Listening at http://localhost:" + port); 
});

