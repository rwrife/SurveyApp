const Sequelize = require('sequelize');

function isAuthed(req, res, next) { 
    if (req.isAuthenticated()) {
        res.redirect('/'); 
        return;
    }        
    return next();
}

module.exports = function(app, passport) {
    const user = require('../models/user')();

    app.get('/register', isAuthed, (req, res) => {
        console.log("register page")
        res.render('register', {
            title: "Register Account",
            isAuthed: req.isAuthenticated()
        });
    });
    
    app.post('/register', passport.authenticate('register', {
        successRedirect: '/',
        failureRedirect: '/register'
    }));

}