'use strict';
const Hapi = require('hapi');
const server = new Hapi.Server();
const Joi = require('joi');

server.connection({ port: 3000 });

server.ext('onRequest', function (request, reply) {
    console.log('on request middleware');
    return reply.continue();
});

/**
* Validation
**/
server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        console.log('route get custom');
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    },
    config: {
       validate: {
           params: {
               name: Joi.string().min(3).max(10)
           }
       }
   }
});


/**
* Caching
**/
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        console.log('route get default');
        reply('Hello, world! ' + count);
    },
    config: {
       cache: {
           expiresIn: 40 * 1000,
           privacy: 'private'
       }
   }
});

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
