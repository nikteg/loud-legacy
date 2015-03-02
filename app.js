require('node-jsx').install();

var express = require('express'),
    favicon = require('serve-favicon'),
    serverRender = require('./app/server'),
    app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static('./public'));

app.use('/', serverRender);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');

    res.status(404);
    res.render('error', {
        message: err.message,
        error: err
    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Express server listening on port ' + this.address().port);
});
