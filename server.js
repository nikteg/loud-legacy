var React = require('react');
var Router = require('react-router');
var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

require('node-jsx').install();

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('connect-livereload')({ port: 35729 }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set up ejs for templating

var routes = require('./app/routes/coreRoutes.js');

app.use(function(req, res, next) {
    var router = Router.create({ location: req.url, routes: routes });
    router.run(function(Handler, state) {
        var html = React.renderToString(React.createElement(Handler));

        return res.render('index', { content: html });
    });
});

module.exports = app;
