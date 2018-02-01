const Sequelize = require('sequelize');

module.exports = function(app, passport) {
    const user = require('../models/user')();

    app.get('/register', (req, res) => {
        console.log("register page")
        res.render('register');
    });
    
    app.post('/register', passport.authenticate('register', {
        successRedirect: '/',
        failureRedirect: '/register'
    }));

}