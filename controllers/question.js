const Sequelize = require('sequelize');

module.exports = function(app, passport) {

    app.get('/questions', (req, res) => {  
        const Questions     = require('../models/question')();
        const Answer        = require('../models/answer')();

        Questions.findAll().then(questions => {
            res.render('question', {
                isAuthed: req.isAuthenticated(),
                title: "Edit Questions",
                addMode: req.query.new,
                questions: questions
            });
        });                
    });

    app.post('/questions',(req, res) => {   
        console.log(req);     
        res.render('question');
    });

}