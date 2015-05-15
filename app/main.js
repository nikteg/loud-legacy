/** @jsx React.DOM */

var React = require('react/addons');
var ReactApp = React.createFactory(require('./components/App'));

var mountNode = document.getElementById('react');

React.render(new ReactApp({}), mountNode);
