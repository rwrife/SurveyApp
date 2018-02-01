const Sequelize = require('sequelize');

module.exports = function(app, passport) {
    

    app.get('/admin/question', (req, res) => {        
        res.render('question');
    });

    app.post('/admin/question',(req, res) => {   
        console.log(req);     
        res.render('question');
    });

}