module.exports = function(app, passport) {
    app.get('/', (req, res) => {        
        res.render('home', {
            isAuthed: req.isAuthenticated()
        });
    });
}