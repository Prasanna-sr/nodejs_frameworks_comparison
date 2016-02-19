/**
* Middlewares are downstream and can go upstream
**/
var koa = require('koa');
var app = koa();

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

app.use(function *() {
    console.log(' ~ routes ~ ');
    this.body = 'Hello World';
});

app.on('error', function(err, ctx){
    console.log(err);
    console.log(ctx);
  log.error('server error', err, ctx);
});


app.listen(3000);
