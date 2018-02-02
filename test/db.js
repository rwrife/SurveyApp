var expect = require('chai').expect;

describe('Datalayer', function() {
    describe('Initialize Sequelize', function() {
        it('Should create the Sequlize object.', function() {
            var db = require('../models/db');
            expect(db).to.not.equal(null);
        });      
    });    
});
