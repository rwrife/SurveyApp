const Sequelize = require('sequelize');
const sequelize = require('./db');

var registered = false;

var user = null;

module.exports = function() {
    if(user) return user;

    var User = sequelize.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        username: {
            type: Sequelize.TEXT
        },
 
        about: {
            type: Sequelize.TEXT
        },
 
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
 
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
 
        last_login: {
            type: Sequelize.DATE
        },
 
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    });

    if(!registered) {
        User.sequelize.sync().then(function() {
            console.log("Register model is ready.");
        }).catch(function(err) {     
            console.log("Register model has failed: ", err);     
        });
        registered = true;
    }

    user = User;
 
    return User;
 
}