/** @jsx React.DOM */
var React = require("react"),
	Router = require('react-router-component'),
	Header = require("./Header"),
	Taco = require("./Taco");

var Pages = Router.Pages;
var Page = Router.Page;

var App = React.createClass({
	render: function() {
		return (
			<html>
				<head>
					<title></title>
					<link rel="stylesheet" href="/css/normalize.css" />
					<link rel="stylesheet" href="/css/main.css" />
					<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1" />
				</head>
				<Pages path={this.props.path}>
				<Page path="/" handler={Taco} />
				<Page path="/header" handler={Header} />
				</Pages>
			</html>
		);
	}
});

module.exports = App;