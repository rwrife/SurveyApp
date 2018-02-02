function isAuthed(req, res, next) {     
    if (req.isAuthenticated())     
        return next();  
    req.session.returnTo = "/survey";
    res.redirect('/login'); 
}

module.exports = {
    init: function(app, passport) {    
        app.put('/answer', isAuthed, (req,res) => {
            var User = require('../models/user')();
            var Answer = require('../models/answer')();
            var UserQuestion = require('../models/userquestions')();
            var Question = require('../models/question')();

            Answer.findById(req.body.a).then(answer => {
                if(!answer) res.end();
                UserQuestion.destroy({
                    where: {userId: req.user.id, questionId: answer.questionId }
                }).then( () => {
                    User.findById(req.user.id).then(user => {
                        UserQuestion.create({
                            userId:user.id,
                            questionId:answer.questionId,
                            answerId:answer.id
                        }).then(record => {
                            res.end();
                        });
                    });
                });
            });        
        });

        app.get('/done', (req, res) => {
            res.render('finish');
        });

        app.get('/survey', isAuthed, (req, res) => {        
            const qN = parseInt(req.query.q || 1);

            const Questions = require('../models/question')();
            const Answers = require('../models/answer')();

            Questions.findAll({
                include: [{
                model: Answers
                }]
            }).then(questions => { 
                const question = (qN <= questions.length ? questions.slice(qN-1, qN) : null)[0];
                var UserQuestion = require('../models/userquestions')();
                UserQuestion.findOne({
                    where: {userId:req.user.id, questionId:question.id}
                }).then( useranswer => {                
                    var selectedAnswer = useranswer ? useranswer.answerId : null;
                
                    res.render('survey', { 
                        name: req.user ? req.user.firstname : "User",
                        isAuthed: req.isAuthenticated(),
                        title: "Customer Survey",
                        question: question,
                        nextQ: (qN < questions.length ? qN+1 : qN), //ok, this is weird
                        q: qN,
                        selectedAnswer: selectedAnswer
                    });
                });
            }).catch( err => {
                console.log(err);
                res.end();
            });
        });
    } //register
}