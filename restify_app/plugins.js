var restify = require('restify');
var server = restify.createServer();

server.use(restify.conditionalRequest());


/**
* AuditLogger Plugin provides instrumentation
**/
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "myapp"});
server.on('after', restify.auditLogger({
    log: log
}));

/**
* Serializers
**/
server.use(restify.requestLogger({
    properties: {
        foo: 'bar'
    },
    serializers: {

    }
}));

/**
* Throttle
**/
server.use(restify.throttle({
  burst: 1,
  rate: 1,
  ip: true,
  overrides: {
    '192.168.1.1': {
      rate: 0,
      burst: 0
    }
  }
}));

server.use(function test(req, res, next) {
    console.log('ok');
    next();
});

server.get('/hello/:name', respond);

function respond(req, res, next) {
    var log = req.log;

    log.error({params: req.params}, 'Hello there %s', 'foo');
    res.send('hello ' + req.params.name);
    privateFunction(req);
    next();
}

function privateFunction(req) {
    req.startHandlerTimer('privateFunction');
    console.log('Private FF F');
    req.endHandlerTimer('privateFunction');
}

server.listen(3000, function() {
    console.log('%s listening at %s', server.name, server.url);
});
