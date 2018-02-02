function isAuthed(req, res, next) { 
    return next();  

    if (req.isAuthenticated())     
        return next();  
    req.session.returnTo = "/survey";
    res.redirect('/login'); 
}

module.exports = function(app, passport) {    
    app.get('/survey', isAuthed, (req, res) => {        
        const qN = parseInt(req.query.q || 1);

        const Questions = require('../models/question')();
        const Answers = require('../models/answer')();

        Questions.findAll({
            include: [{
              model: Answers
            }]
          }).then(questions => {   
            res.render('survey', { 
                name: req.user ? req.user.firstname : "User",
                isAuthed: req.isAuthenticated(),
                title: "Customer Survey",
                questions: (qN <= questions.length ? questions.slice(qN-1, qN) : null),
                nextQ: (qN < questions.length ? qN+1 : qN), //ok, this is weird
                q: qN
            });
        }).catch( err => {
            console.log(err);
            res.end();
        });
    });
}