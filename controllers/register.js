const Sequelize = require('sequelize');

function isAuthed(req, res, next) { 
    if (req.isAuthenticated()) {
        res.redirect('/'); 
        return;
    }        
    return next();
}

module.exports = {
    init: function(app, passport) {
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
    }, //register

    createUser: function(email, firstname, lastname, password, done) {
        const User = require('../models/user')(); 
        const bCrypt = require('bcrypt-nodejs');

        User.findOne({
            where: {
                email: email
            }
        }).then( user => {
            if(user) {
                console.log("Account taken.");
                return done(null, false, {message: 'Account already taken.'});
            } else {
                var passwordHash = bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

                User.create({
                    email: email, 
                    password: passwordHash, 
                    firstname: firstname, 
                    lastname: lastname
                }).then(function(newUser, created) { 
                    console.log("User created.");
                    if (!newUser) {             
                        return done(null, false);             
                    } else {
                        return done(null, newUser);
                    }        
                });                    
            }
        });
    }//createUser
}