var koa = require('koa');
var app = koa();
app.listen(3000);

/**
* middlewares
**/
app.use(function *(next){
    console.log('m 1');
    yield next;

});

/**
* Default Routes
**/
app.use(function *(){
    this.body = 'Hello World';
});
