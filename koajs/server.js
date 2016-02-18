var koa = require('koa');
var app = koa();
app.listen(3000);

app.use(function *(next){
    console.log('m 1');
});

app.use(function *(){
    this.body = 'Hello World';
});
