const posts = {
    index: require("./posts/index.js").handler,
    create: require("./posts/create.js").handler
}

exports.routingMapper = {
    "/posts": {
        "GET": posts.index,
        "POST": posts.create
    },
    "/posts/{postId}": {
        "PUT": posts.create
    }  
}
