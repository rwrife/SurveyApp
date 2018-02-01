const Sequelize = require('sequelize');

module.exports = function(app, passport) {
    const user = require('../models/user')();

    app.get('/login', (req, res) => {    
        //console.log(req.flash('error'))    
        res.render('login', {
            title: "Login",
            errors: req.flash('error')
        });
    });

    app.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash : true
    }));

}