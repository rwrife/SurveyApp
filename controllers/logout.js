module.exports = function(app, passport) {
    app.get('/logout', (req, res) => {        
        req.session.destroy(function(err) { 
            res.redirect('/');     
        });
    });
}