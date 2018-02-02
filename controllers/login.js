const Sequelize = require('sequelize');

module.exports = function(app, passport) {
    const user = require('../models/user')();

    app.get('/login', (req, res) => {    
        res.render('login', {
            title: "Login",
            errors: req.flash('error')
        });
    });

    app.post('/login', passport.authenticate('login', {
        successReturnToOrRedirect: '/',
        failureRedirect: '/login',
        failureFlash : true        
    }));

}