const Sequelize = require('sequelize');

module.exports = {
    init: (app, passport) => {
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
    },

    login: (email, password, done) => {
        const User = require('../models/user')(); 
        const bCrypt = require('bcrypt-nodejs');

        User.findOne({
            where: {
                email: email
            }
        }).then((user) => {                
            if(!user) {
                console.log("Account not found.");
                return done(null, false, {message: 'Account not found.'});
            } else {
                console.log("Account found.");
                if(bCrypt.compareSync(password, user.password)) {
                    console.log("Authenticated.");                                                        
                    return done(null, user);
                } else {
                    console.log("Password did not match.");
                    return done(null, false, {message: "Invalid password."});
                }
                
            }
        });
    }
}
