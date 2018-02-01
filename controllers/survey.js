function isAuthed(req, res, next) { 
    if (req.isAuthenticated())     
        return next();  
    req.session.returnTo = "/survey";
    res.redirect('/login'); 
}

module.exports = function(app, passport) {
    app.get('/survey', isAuthed, (req, res) => {        
        res.render('survey', { 
            name: req.user.firstname,
            isAuthed: req.isAuthenticated(),
            title: "Customer Survey"
        });
    });
}