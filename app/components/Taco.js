/** @jsx React.DOM */
var React = require("react");

var Link = require('react-router-component').Link;

var Taco = React.createClass({
	render: function() {
		return (
			<div>
				I AM TACO
				<Link href="header" href="/header">Länk</Link>
			</div>
		);
	}
});

module.exports = Taco;