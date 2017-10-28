var router = require("./router.js").routingMapper;

exports.handler = function (event, context, callback) {
    console.info("Executing dispatcher");
    console.info(event);

    var endpoint = router[event.resource];

    if (!endpoint) {
        console.info("Endpoint [%s] not found", event.resource);
        return callback(null, {
            "statusCode": 404
        })
    }

    var endpointMethod = endpoint[event.httpMethod];

    if (!endpointMethod) {
        console.info("Method [%s] not allowed for endpoint [%s]", event.httpMethod, event.resource);
        return callback(null, {
            "statusCode": 405
        })
    }

    console.info("Executing [%s %s]", event.httpMethod, event.path);
    endpointMethod(event, context, function (error, result) {
        if (error) {
            return callback({
                "isBase64Encoded": false,
                "statusCode": 500,
                "headers": {
                    "Access-Control-Allow-Origin": "*"
                },
                "body": JSON.stringify(error)
            })
        }

        callback(null, {
            "isBase64Encoded": false,
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(result)
        })
    })
};

