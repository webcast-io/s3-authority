
/**
 * Deps
 */

var crypto   = require('crypto');
var mime     = require('mime');
var defaults = require('defaults');

/**
 * Helpers
 */

/**
 * Converts a JS Date() to a ISO 8601 Representation
 * @param {Date} d
 */
 function ISODateString(d){
  function pad(n){
    return n<10 ? '0'+n : n;
  }
  return d.getUTCFullYear()+'-' +
  pad(d.getUTCMonth()+1)+'-' +
  pad(d.getUTCDate())+'T' +
  pad(d.getUTCHours())+':' +
  pad(d.getUTCMinutes())+':' +
  pad(d.getUTCSeconds())+'Z';
}

/**
 * Generate a ISO 8601 Date for x seconds from now
 * @param  {Number} secondsFromNow Number of seconds until the expiry
 * @return {String}                ISO 8601 Date Representation
 */
 function generateExpiry(secondsFromNow) {
  return ISODateString(new Date((new Date()).getTime() + secondsFromNow * 1000));
}

/**
 * S3Authority "Class"
 * @param {Object} options required .accessKey and .secretKey. A default .bucket is optional
 */
var S3Authority = function(options) {

  if (!options.accessKey || !options.secretKey) {
    throw new Error('Both `accessKey` & `secretKey` must be given (you may also want `bucket`)');
  }

  this.accessKey = options.accessKey;
  this.secretKey = options.secretKey;
  this.bucket    = options.bucket;

  return this;

};

S3Authority.prototype.readPolicy = function(options) {
  options = defaults(options, this.options);

  var dateObj = new Date();
  var expiration = new Date(dateObj.getTime() + duration * 1000);
  expiration = Math.round(expiration.getTime() / 1000);

  if(download[0] !== '"' || download[download.length-1] !== '"') {
    download = '"' + download + '"';
  }

  var policy = 'GET\n\n\n' + expiration + '\n';
  policy += '/' + bucket + '/' + key;
  if (download) {
    policy += '?response-content-disposition=attachment;filename=' + download;
  }

  var signature = crypto.createHmac("sha1", this.secretKey).update(policy);

  var urlInfo = {
    hostname: 's3.amazonaws.com',
    path: '/' + bucket + '/' + key,
    query: {
      AWSAccessKeyId: this.accessKey,
      Expires: expiration,
      Signature: encodeURIComponent(signature.digest("base64"))
    }
  };

  if(download) {
    urlInfo.query['response-content-disposition'] = 'attachment;filename=' + encodeURIComponent(download);
  }

  return url.format(urlInfo);

};


S3Authority.prototype.writePolicy = function(options) {

  options = defaults(options, this);

  // options = {
  //   key, bucket, duration, filesize, acl
  // }

  var dateObj = new Date();
  var dateExp = new Date(dateObj.getTime() + options.duration * 1000);
  var policy = {
    'expiration': generateExpiry(options.expiry),
    'conditions':[
    {
      'bucket': options.bucket
    },
    ['starts-with','$key","uploads/'],
    {
      "acl": options.acl
    },
    ['content-length-range', 0, options.filesize * 1000000],
    ['starts-with','$Content-Type','']
    ]
  };

  var policyString = JSON.stringify(policy);
  var policyBase64 = new Buffer(policyString).toString('base64');
  var signature = crypto.createHmac("sha1", this.secretKey).update(policyBase64);
  var accessKey = this.accessKey;
  var s3Credentials = {
    s3PolicyBase64:policyBase64,
    s3Signature:signature.digest("base64"),
    s3Key:accessKey,
    acl:options.acl,
    mime: options.mime || mime.lookup(options.key)
  };

  return s3Credentials;

};



module.exports = function(options) {
  return new S3Authority(options);
};
module.exports.S3Authority = S3Authority;