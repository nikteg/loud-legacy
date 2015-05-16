var React = require('react');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;

var App = require('../components/App');
var Main = require('../components/Main');
var About = require('../components/About');

var routes = module.exports = [
    <Route name="app" path="/" handler={App}>
        <DefaultRoute name="main" handler={Main} />
        <Route name="about" handler={About} />
        <Route name="profile" handler={About} />
    </Route>
];
