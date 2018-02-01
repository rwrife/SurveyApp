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
    defaultLayout: 'paper'
}));
app.set('view engine', '.hbs');

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

