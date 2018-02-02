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

});