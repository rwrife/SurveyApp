const Sequelize = require('sequelize');
const sequelize = require('./db');

var registered = false;

var question = null;

module.exports = function() {
    if(question) return question;
    
    var Question = sequelize.define('question', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        message: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        cssClass: {
            type: Sequelize.STRING
        }, 

        type: {
            type: Sequelize.ENUM('one', 'many'),
            defaultValue: 'many'
        }
    });
    
    var Answers = require('./answer')();
    Question.hasMany(Answers);

    if(!registered) {
        Question.sequelize.sync().then(function() {
            console.log("Question model is ready.");
        }).catch(function(err) {     
            console.log("Question model has failed: ", err);     
        });
        registered = true;
    }

    question = Question;
 
    return Question;
 
}