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

describe('Controllers', function() {
  describe('Registration Controller', function(){
    afterEach(function(done){
      const User = require('../models/user')();
      User.destroy({
        where: {
            email:'test@example.com'
        }
      }).then(function() {
        done();
      });      
    });//after

    it('Should register a user.', function(done) {
      const RegistrationController = require('../controllers/register');
      RegistrationController.createUser('test@example.com','test','test','test', 
        (a,b) => { 
          if(b) done();
          else done(new Error('Creation did not work right.'));
        });
    });
  });//registration controller

  describe('Login Controller', function(){
    beforeEach(function(done) {
      const User = require('../models/user')();
      const bCrypt = require('bcrypt-nodejs');
      var passwordHash = bCrypt.hashSync('secret', bCrypt.genSaltSync(8), null);
      User.create({
        email: 'test@example.com', 
        password: passwordHash, 
        firstname: 'test', 
        lastname: 'test'
      }).then( user => {
        done();
      });
    });//before

    afterEach(function(done) {
      const User = require('../models/user')();
      User.destroy({
        where: {
            email:'test@example.com'
        }
      }).then(function() {
        done();
      });
    }); //after

    it('Should login user.', function(done) {
      const LoginController = require('../controllers/login');
      LoginController.login('test@example.com', 'secret', (a,b) => {
        if(b) done();
        else done(new Error('Failed to login.'));
      });
    });

  }); //login controller
});