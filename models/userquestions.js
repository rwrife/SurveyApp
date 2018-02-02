const Sequelize = require('sequelize');
const sequelize = require('./db');

var registered = false;

var userquestion = null;

module.exports = function() {
    if(userquestion) return userquestion;

    var UserQuestion = sequelize.define('userquestion', {   
    });

    var Answer = require('./answer')();
    var Question = require('./question')();
    var User = require('./user')();    
    
    Question.belongsToMany(User, {through: UserQuestion});
    UserQuestion.belongsTo(Answer);

    if(!registered) {
        UserQuestion.sequelize.sync().then(function() {
            console.log("UserQuestion model is ready.");
        }).catch(function(err) {     
            console.log("UserQuestion model has failed: ", err);     
        });
        registered = true;
    }

    userquestion = UserQuestion;
 
    return userquestion;
}