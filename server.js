var express = require('express'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    path = require('path');
    app = express();

require('node-jsx').install();

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('connect-livereload')({ port: 35729 }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set up ejs for templating

require(path.join(__dirname, 'app/routes/coreRoutes.js'))(app);

module.exports = app;