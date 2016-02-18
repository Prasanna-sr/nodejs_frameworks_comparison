'use strict';
const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({ port: 3000 });

server.ext('onRequest', function (request, reply) {
    console.log(' ~ Middleware ~');
    return reply.continue();
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        console.log(' ~ route get ~');
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
