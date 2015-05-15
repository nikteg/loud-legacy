/** @jsx React.DOM */

var React = require('react'),
    Router = require('react-router-component'),
    Header = require('./Header'),
    Main = require('./Main');

var Locations = Router.Locations;
var Location = Router.Location;

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Header />
                <Locations path={this.props.path} id="content">
                    <Location path="/" handler={Main} />
                </Locations>
            </div>
        );
    }
});

module.exports = App;
