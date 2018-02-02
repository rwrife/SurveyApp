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

    app.get('/questions/delete/:id', (req, res) => {
        const Questions = require('../models/question')();
        Questions.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            //res.json({message:'Deleted'});
            res.redirect('/questions');
        });
    });

    app.post('/questions',(req, res) => {   
        const Questions = require('../models/question')();
        const Answers = require('../models/answer')();

        Questions.create({
            message: req.body.question            
        }).then(function(newQuestion, created) { 
            console.log("Question created.");
            if (!newQuestion) {   
                return done(null, false);             
            } else {
                if(typeof req.body.answer === 'Array') {
                    req.body.answer.foreach(answer => {
                        Answer.create({
                            text: answer,
                            questionId: newQuestion.id
                        }); //fire and forget??
                    });
                } else if (req.body.answer) {
                    Answer.create({
                        text: answer,
                        questionId: newQuestion.id
                    });
                }
                return done(null, newQuestion);
            }        
        }); 

        res.redirect('/questions');
    });

}