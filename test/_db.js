var expect = require('chai').expect;

var util = require('util');
var fs = require('fs');

//supress console output for testing
console.log = console.info = function(t) {
  var out;
  if (t && ~t.indexOf('%')) {
    out = util.format.apply(util, arguments);
    process.stdout.write(out + '\n');
    return;
  } 
};

describe('Datalayer', function() {
    it('Should create the Sequelize object.', function() {
        var db = require('../models/db');
        expect(db).to.not.equal(null);
    });   

    describe('Test Models', function() {
        afterEach(function(done) {
            //not ideal
            var Answer = require('../models/answer')();
            Answer.destroy({
                where: {
                    text: 'test'
                }
            });
            var Question = require('../models/question')();
            Question.destroy({
                where: {
                    message: 'test'
                }
            });

            done();
        });

        it('Answer should create.', function(done) {
            var Answer = require('../models/answer')();              
            Answer.create({
                text: 'test'
            }).then( answer => {
                if(answer) done();
                else done(new Error("Failed to create answer."))
            });    
        });

        it('Question should create.', function(done) {
            var Question = require('../models/question')();
            Question.create({
                message: 'test'
            }).then( question => {                
                if(question) done();
                else done(new Error("Failed to create question."))
            });                    
        });        
    });

});
