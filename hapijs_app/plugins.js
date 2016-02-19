'use strict';
const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({ port: 3000 });
/**
* Creating plugins
**/
//Plugin can be a router, middleware
const myPlugin = {
    register: function (server, options, next) {
        console.log('~ Hapijs plugin body ~')
        next();
    }
};

myPlugin.register.attributes = {
    name: 'myPlugin',
    version: '1.0.0'
};

// loading plugin (plugins)
server.register(myPlugin, (err) => {
    if (err) {
        console.error('Failed to load plugin:', err);
    }
});

server.ext('onRequest', function (request, reply) {
    console.log('on request middleware');
    return reply.continue();
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        console.log('route get custom');
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
