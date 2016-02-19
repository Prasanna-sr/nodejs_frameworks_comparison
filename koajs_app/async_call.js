var app = require('koa')();

function makeAsyncCall (next) {
    setTimeout(function() {
        next();
    }, 5000);
}
app.use(function* respond(next) {
   console.log('respond ..')
   yield makeAsyncCall;
   console.log(' ok !');
   this.body = 'OK';
});

app.listen(3000);
