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
            
            if(!req.body.a) res.end();

            var answerIds = JSON.parse(req.body.a); //ehh, body parse isn't working??

            if(answerIds) {
                Answer.findById(answerIds[0]).then(answer => {
                    if(!answer) {
                        res.end();
                        return;
                    }
                    UserQuestion.destroy({
                        where: {userId: req.user.id, questionId: answer.questionId }
                    }).then( () => {
                        User.findById(req.user.id).then(user => {
                            console.log(answerIds)
                            answerIds.forEach( aid => {
                                UserQuestion.create({
                                    userId:user.id,
                                    questionId:answer.questionId,
                                    answerId:aid
                                });
                            });
                            res.end();
                        });
                    });
                }); 
            }       
        });

        app.get('/done', (req, res) => {
            res.render('finish');
        });

        function figureOutLastUnansweredQuestion(user, q) {
            return new Promise( (resolve,reject) => {
                if(!q) {
                    const UserQuestion = require('../models/userquestions')();
                    UserQuestion.findAll( {
                        where: {userId: user.id}
                    }).then( questions => {
                        var uniqueQuestions = [];
                        questions.forEach( question => {                            
                            if(uniqueQuestions.indexOf(question.questionId) < 0) {
                                uniqueQuestions.push(question.questionId);
                            }
                        });

                        const Questions = require('../models/question')();
                        Questions.findAll().then( questions => {
                            for(var i=0;i<questions.length;i++) {
                                if(uniqueQuestions.length == questions.length) {
                                    resolve(1); //start over??
                                    return;
                                }
                                if(uniqueQuestions.indexOf(questions[i].id) < 0) {
                                    resolve(i+1); //hopefully it's in order
                                    return;
                                }
                            }
                            resolve(1);
                            return;
                        });
                    });
                } else {
                    resolve(parseInt(q)); //ehh
                    return;
                }                 
            });
        }

        app.get('/survey', isAuthed, (req, res) => {        

            figureOutLastUnansweredQuestion(req.user, req.query.q).then( q => {                
                const qN = q; //parseInt(req.query.q || 1);

                const Questions = require('../models/question')();
                const Answers = require('../models/answer')();

                Questions.findAll({
                    include: [{
                    model: Answers
                    }]
                }).then(questions => { 
                    const question = (qN <= questions.length ? questions.slice(qN-1, qN) : null)[0];
                    var UserQuestion = require('../models/userquestions')();                
                    UserQuestion.findAll({
                        where: {userId:req.user.id, questionId:question.id}
                    }).then( useranswers => { 
                        if(useranswers) {               
                            var selectedAnswers = useranswers.map( answer => { return answer.answerId; });
                        
                            res.render('survey', { 
                                name: req.user ? req.user.firstname : "User",
                                isAuthed: req.isAuthenticated(),
                                title: "Customer Survey",
                                question: question,
                                nextQ: (qN < questions.length ? qN+1 : qN), //ok, this is weird
                                q: qN,
                                selectedAnswers: selectedAnswers,
                                isReturning: (!req.query.q && q > 1)
                            });
                        } else res.end();
                    });
                }).catch( err => {
                    res.end();
                });
            });
        });
    } //register
}