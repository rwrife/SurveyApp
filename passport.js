var bCrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
    passport.serializeUser(function(user, done) { 
        done(null, user.id);     
    });

    passport.deserializeUser(function(id, done) {
        const User = require('./models/user')(); 
        User.findById(id).then(function(user) {     
            if (user) {     
                done(null, user.get());     
            } else {     
                done(user.errors, null);     
            }     
        });     
    });

    passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true     
        },
        (req, email, password, done) => {  
            process.nextTick(function () { 
                const User = require('./models/user')(); 
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
            });
        }
    ));    

    passport.use('register', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true     
        },
        (req, email, password, done) => {    
            process.nextTick(function () {           
                const RegisterController = require('./controllers/register');
                return RegisterController.createUser(
                    email,
                    req.body.firstname,
                    req.body.lastname,
                    password,
                    done
                );
            });
        }
    ));
}