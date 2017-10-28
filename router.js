const posts = {
    create: require("./posts/create.js").handler,
    index: require("./posts/index.js").handler,
    update: require("./posts/update.js").handler,
    delete: require("./posts/delete.js").handler
};

exports.routingMapper = {
    "/posts": {
        "POST": posts.create,
        "GET": posts.index,
        "PUT": posts.update,
        "DELETE": posts.delete
    }
};
