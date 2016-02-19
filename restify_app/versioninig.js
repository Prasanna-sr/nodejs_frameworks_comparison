var restify = require('restify');
var server = restify.createServer();

server.use(function test(req, res, next) {
    console.log('ok');
    next();
});

server.get({path: '/hello/:name', version: '1.0.0'}, respondV1);
server.get({path: '/hello/:name', version: '2.0.1'}, respondV2);

function respondV1(req, res, next) {
    res.send('hello v1 name ' + req.params.name);
    next();
}
function respondV2(req, res, next) {
    console.log(req.headers)
    res.send('hello v2 name ' + req.params.name);
    next();
}
server.listen(3000, function() {
    console.log('%s listening at %s', server.name, server.url);
});


//example curl command to test the api's
//curl -s -H "accept-version:1.0.1" localhost:3000/hello/prk
