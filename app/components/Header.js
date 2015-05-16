/** @jsx React.DOM */

var React = require('react');

var Link = require('react-router').Link;

var Header = React.createClass({
    render: function() {
        return (
            <header id="header">
                <ul className="nav">
                    <li>
                        <Link to="profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="main">
                            <span className="logo">Loud<span className="beta">BETA</span></span>
                        </Link>
                    </li>
                    <li>
                        <Link to="about">About</Link>
                    </li>
                </ul>
            </header>
        );
    }
});

module.exports = Header;
