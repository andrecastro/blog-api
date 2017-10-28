console.info("Initializing Delete API of Posts...");

var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {
    console.info(event);

    var body = event; // custom integration the event is the body

    if (event.body) {
        body = JSON.parse(event.body) // case of lambda proxy integration
    }

    var post = {
        subject: body.subject,
        created: body.created
    };

    var params = {
        TableName: "posts",
        Key: post
    };

    dynamo.delete(params, function (error, result) {
        if (error) {
            console.error(error);
            return callback(error)
        }

        console.info("Successfuly deleted a post");
        callback()
    })
};
