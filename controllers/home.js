module.exports = function(app, passport) {
    app.get('/', (req, res) => {            
        res.render('home', {
            atHome: true,
            isAuthed: req.isAuthenticated(),
            title: "Welcome!"
        });
    });
}