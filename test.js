
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
      assert(new S3Authority.S3Authority({
        accessKey: 'asdsad',
        secretKey: 'asdsadas'
      }) instanceof S3Authority.S3Authority);
    });

    it('should accept `()` create call', function() {
      assert(new S3Authority({
        accessKey: 'asdsad',
        secretKey: 'asdsadas'
      }) instanceof S3Authority.S3Authority);
    });

  });

  describe('readPolicy()', function() {

  });

  describe('writePolicy()', function() {

    var s3Auth;

    before(function() {

      s3Auth = S3Authority({
        accessKey: process.env.S3_ACCESS_KEY,
        secretKey: process.env.S3_SECRET_KEY,
        bucket: process.env.S3_BUCKET
      });

      console.log(s3Auth)

    });

    it('should error if missing bucket');
    it('should error if missing key');
    it('should error if missing bucket');
    it('should error if missing duration');
    it('should error if missing filesize');
    it('should error if missing acl');

    it('should return a policy if all acceptable', function() {

      var policy = s3Auth.writePolicy({

        key: '/s3-authority-test.txt',
        duration: 100,
        bucket: 'my-upload-bucket', // Optional IF defined when setting up
        filesize: 54123,
        acl: 'public-read'

      });

      assert.equal(typeof policy.s3PolicyBase64, 'string');
      assert.equal(typeof policy.s3Signature, 'string');
      assert.equal(typeof policy.s3Key, 'string');
      assert.equal(typeof policy.acl, 'string');
      assert.equal(typeof policy.mime, 'string');

    });

  });


});