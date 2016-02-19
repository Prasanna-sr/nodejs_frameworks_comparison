var restify = require('restify');
var server = restify.createServer();

server.use(function test(req, res, next) {
    console.log('ok');
    next();
});

server.get('/hello/:name', respond);

function respond(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}
server.listen(3000, function() {
    console.log('%s listening at %s', server.name, server.url);
});
