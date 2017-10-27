console.info("Initializing List API of Posts...")

var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {
    console.info("Listing posts...")

    var params = {
        TableName: "posts",  
        KeyConditionExpression: 'subject = :subject and created < :created',
        ExpressionAttributeValues: {
            ':subject': 'blog-jedi',
            ':created': new Date().toISOString()
        }
    }

    dynamo.query(params, function (error, result) {
        if (error) {
            console.error(error)
            return callback(error)
        }
        
        console.info("Successfuly queried posts")
        callback(null, result.Items)
    })
}
