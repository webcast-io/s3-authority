
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

    it('should accept `new` create call', function() {
      assert(new S3Authority({
        accessKey: 'asdsad',
        secretKey: 'asdsadas'
      }) instanceof S3Authority);
    });

    it('should accept `()` create call', function() {
      assert(new S3Authority({
        accessKey: 'asdsad',
        secretKey: 'asdsadas'
      }) instanceof S3Authority);
    });


  });

  describe('readPolicy()', function() {

  });

  describe('writePolicy()', function() {

  });


});