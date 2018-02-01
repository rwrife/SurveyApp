const Sequelize = require('sequelize');

module.exports = function(app, passport) {
    const user = require('../models/user')();

    app.get('/login', (req, res) => {        
        res.render('login');
    });

    app.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash : true
    }));

}