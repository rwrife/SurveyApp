module.exports = function(app, passport) {
    app.get('/', (req, res) => {    
        const Answers = require('../models/answer')();
        var User = require('../models/user')();
        User.findAll({
            include: [{
                model: Answers
            }]
        }).then(users => {
            req.session.user = users[0];
        });

        res.render('home', {
            atHome: true,
            isAuthed: req.isAuthenticated(),
            title: "Welcome!"
        });
    });
}