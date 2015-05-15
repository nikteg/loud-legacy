/** @jsx React.DOM */

var React = require('react');
var Header = require('./Header');
var Player = require('./Player');
var Main = require('./Main');

var RouteHandler = require('react-router').RouteHandler;

var App = React.createClass({
    render: function() {
      return (
          <div>
              <Header />
                  <RouteHandler />
              <Player />
          </div>
      );
    }
});

module.exports = App;
