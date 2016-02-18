var koa = require('koa');
var app = koa();
var _ = require('koa-route');

app.use(function *(next){
    console.log(' ~ middleware 1 ~');
    var start = new Date;
    yield next;
    console.log(' ~ middleware 11 ~ ');
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(function *(next){
  console.log(' ~ middleware 2 ~ ');
  var start = new Date;
  yield next;
  console.log(' ~ middleware 22 ~ ');
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// callback based middlewares doesn't work

// app.use(function(req, res, next) {
//     console.log('XXXXXXX')
//     next();
// });

/**
* Custom router
**/
app.use(_.get('/test', function *(){
    console.log(' ~ custom router ~ ');
  this.body = 'Hello TEST World';
}));

app.use(function *() {
    console.log(' ~ routes ~ ');
    this.body = 'Hello World';
});

app.listen(3000);
app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
});
