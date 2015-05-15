var React = require('react');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;

var App = require('../components/App');

var routes = module.exports = [
    <Route path="/" handler={App}>
    </Route>
];
