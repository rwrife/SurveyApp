var express     = require('express');
var app         = express();
var passport    = require('passport');
var session     = require('express-session');
var bodyParser  = require('body-parser');
var exphbs      = require('express-handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'secret',resave: true, saveUninitialized:true}));
app.use(passport.initialize()); 
app.use(passport.session());

app.set('views', './views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

require('./passport')(passport);
require('./controllers/register')(app, passport);
require('./controllers/home')(app, passport);
require('./controllers/login')(app, passport);
require('./controllers/survey')(app, passport);
require('./controllers/logout')(app, passport);
 
app.listen(5000, function(err) {
    if (!err)
        console.log("Listening at http://localhost:5000"); 
});

