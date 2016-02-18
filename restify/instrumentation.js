var restify = require('restify');
var bunyan = require('bunyan');
var server = restify.createServer();
var log = bunyan.createLogger({name: "myapp"});

server.use(function test(req, res, next) {
    console.log('ok');
    next();
});

server.get('/hello/:name', respond);

function respond(req, res, next) {
    res.send('hello ' + req.params.name);
    privateFunction(req);
    next();
}

function privateFunction(req) {
    req.startHandlerTimer('privateFunction');
    console.log('Private FF F');
    req.endHandlerTimer('privateFunction');
}

server.on('after', restify.auditLogger({
    log: log
}));

server.listen(3000, function() {
    console.log('%s listening at %s', server.name, server.url);
});
