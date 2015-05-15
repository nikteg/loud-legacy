/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var routes = require('./routes/coreRoutes.js');

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
    React.render(<Handler />, document.body);
});
