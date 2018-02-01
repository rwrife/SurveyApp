import { BADQUERY } from 'dns';

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

        type: {
            type: Sequelize.ENUM('one', 'many'),
            defaultValue: 'many'
        }
    });

    if(!registered) {
        Question.sequelize.sync().then(function() {
            console.log("Question contoller is ready.");
        }).catch(function(err) {     
            console.log("Question controller has failed: ", err);     
        });
        registered = true;
    }

    question = Question;
 
    return Question;
 
}