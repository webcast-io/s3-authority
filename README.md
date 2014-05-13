# S3 Authority [![Build Status](https://travis-ci.org/webcast-io/s3-authority.svg?branch=master)](https://travis-ci.org/webcast-io/s3-authority)

S3 Read/Write Policy Generator.

## Usage

### Setting Up

```js
var S3Authority = require('s3-authority');

var s3Auth = S3Authority({
  accessKey: /* ... */,
  secretKey: /* ... */,
  bucket: /* ... */ // OPTIONAL (Can be specified later)
});
```

### Creating a Write Policy

```js
s3Auth.writePolicy({

  key: '/my/file/location.txt',
  
  // Number of seconds until policy expires
  // (this is for the client to initialize a request)
  duration: 100,

  bucket: 'my-upload-bucket', // Optional IF defined when setting up

  filesize: 54123,

  acl: 'public-read'

})

