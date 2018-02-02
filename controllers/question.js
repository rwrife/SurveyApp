const Sequelize = require('sequelize');

module.exports = function(app, passport) {

    app.get('/questions', (req, res) => {  
        const Questions     = require('../models/question')();    

        Questions.findAll().then(questions => {
            res.render('question', {
                isAuthed: req.isAuthenticated(),
                title: "Edit Questions",
                addMode: req.query.new,
                questions: questions
            });
        }).catch( err => {            
            res.redirect('/');
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

        var answers = [];
        
        if(typeof req.body.answer === 'object') {
            answers = req.body.answer.map(answer => {
                return {text: answer};
            });
        } else { 
            if(req.body.answer) {
                answers = {text:req.body.answer};
            }
        }
        console.log(answers)

        Questions.create({
            message: req.body.question,
            answers: answers
        }, {
            include: [Answers]
        }).then(function(newQuestion, created) { 
            console.log("Question created.");
            res.redirect('/questions');       
        }); 

        
    });

}