var app = require('koa')();

app.use(function* test(next) {
   console.log('start test');
   yield next;
   console.log('end test');
});

app.use(function* process(next) {
   console.log('process ..')
   yield next;
   console.log('processing ...... ')
   yield function(done) {
      console.log('set timeout');
      setTimeout(done, 5000);
   };
   console.log('processed');
});

app.use(function* respond(next) {
   console.log('respond ..')
   this.body = 'OK';
});

app.listen(3000);
