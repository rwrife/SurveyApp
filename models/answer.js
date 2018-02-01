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
 
        question_id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },

        text: {
            type: Sequelize.STRING,
            notEmpty: true
        }

    });

    var Question = require('question')();
    Answer.belongsTo(Question);

    if(!registered) {
        Answer.sequelize.sync().then(function() {
            console.log("Answer contoller is ready.");
        }).catch(function(err) {     
            console.log("Answer controller has failed: ", err);     
        });
        registered = true;
    }

    answer = Answer;
 
    return Answer;
 
}