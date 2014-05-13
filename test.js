
var assert      = require('assert');
var S3Authority = require('./');

describe('S3Authority', function() {

  describe('()', function() {

    it('should error when missing accessKey', function() {
      assert.throws(function() {
        S3Authority({
          secretKey: 'asdasdasd'
        });
      }, /accessKey/);
    });

    it('should error when missing secretKey', function() {
      assert.throws(function() {
        S3Authority({
          accessKey: 'asdsaf'
        });
      }, /secretKey/);
    });

  });

  describe('readPolicy()', function() {

  });

  describe('writePolicy()', function() {

  });


});