var express     = require('express');
var app         = express();
var passport    = require('passport');
var session     = require('express-session');
var bodyParser  = require('body-parser');
var exphbs      = require('express-handlebars');
var flash       = require('connect-flash');

app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'secret',resave: true, saveUninitialized:true}));
app.use(passport.initialize()); 
app.use(passport.session());

app.use(express.static(__dirname + '/node_modules/papercss/dist'));
app.use(express.static(__dirname + '/node_modules/font-awesome'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/static'));

app.set('views', './views')
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'paper',
    helpers: {
        eq: function (a, b, options) {   if(a == b) { return options.fn(this); } return options.inverse(this);},
        neq: function (a, b, options) {   if(a != b) { return options.fn(this); } return options.inverse(this);},
        minus: function(a, b, options) { return a - b; },
        plus: function(a, b, options) { return a + b; }
    }    
}));
app.set('view engine', '.hbs');

require('./models/user')();
require('./models/question')();
require('./models/answer')();
require('./models/userquestions')();

require('./passport')(passport);
require('./controllers/register')(app, passport);
require('./controllers/home')(app, passport);
require('./controllers/login')(app, passport);
require('./controllers/survey')(app, passport);
require('./controllers/logout')(app, passport);
require('./controllers/question')(app,passport);
 
app.listen(5000, function(err) {
    if (!err)
        console.log("Listening at http://localhost:5000"); 
});

