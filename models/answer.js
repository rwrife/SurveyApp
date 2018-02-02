const Sequelize = require('sequelize');
const sequelize = require('./db');

var registered = false;

var answer = null;

module.exports = function() {
    if(answer) return answer;

    var Answer = sequelize.define('answer', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        
        text: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        secretMessage: {
            type: Sequelize.STRING
        },

        cssClass: {
            type: Sequelize.STRING
        }        
    });

    if(!registered) {
        Answer.sequelize.sync().then(function() {
            console.log("Answer model is ready.");
        }).catch(function(err) {     
            console.log("Answer model has failed: ", err);     
        });
        registered = true;
    }

    answer = Answer;
 
    return Answer;
}