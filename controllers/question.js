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

        console.log(req.body)
        
        if(typeof req.body.answer === 'object') {
            for(var i=0;i<req.body.answer.length;i++) {
                answers.push({
                    text:req.body.answer[i],
                    cssClass:req.body.answerclass[i],
                    secretMessage:req.body.answersecret[i]
                });
            }
            //answers = req.body.answer.map(answer => {
            //    return {text: answer, };
            //});
        } else { 
            if(req.body.answer) {
                answers.push({
                    text:req.body.answer,
                    cssClass:req.body.answerclass,
                    secretMessage:req.body.answersecret
                });
            }
        }
        console.log(answers)

        Questions.create({
            message: req.body.question,
            type:req.body.type,
            cssClass:req.body.class,
            answers: answers
        }, {
            include: [Answers]
        }).then(function(newQuestion, created) { 
            console.log("Question created.");
            res.redirect('/questions');       
        });
    });

}