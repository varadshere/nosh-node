var AWS = require('aws-sdk');
AWS.config.loadFromPath('./app/config/s3_config.json');
var s3Bucket = new AWS.S3( { params: {Bucket: 'wotopa'} } );

exports.uploadImg = function (imgData, done) {
    var buf = new Buffer(imgData.replace(/^data:image\/\w+;base64,/, ""),'base64');
    var imageName = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36) + '.jpeg';
    var data = {
        Key:  imageName,
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
    };
    s3Bucket.putObject(data, function(err, data){
        if (err) {
            console.log(err);
            console.log('Error uploading data: ', data);
            done(imageName, err);
        } else {
            done(imageName, err);
            console.log(data);
            console.log('succesfully uploaded the image!');
        }
    });
}

exports.getS3Url = function (imgName, done) {
    // console.log('Key ' + imgName);
    var params = {Bucket: 'wotopa', Key: imgName, Expires: 180};
    s3Bucket.getSignedUrl('getObject', params, function (err, url) {
        console.log('URL');
        console.log(url);
        console.log(err);
        done(url, err);
    });
    // console.log('The URL is', url); // expires in 60 seconds
}