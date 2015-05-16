/** @jsx React.DOM */

var React = require('react');
var Header = require('./Header');
var Player = require('./Player');
var Main = require('./Main');

var RouteHandler = require('react-router').RouteHandler;

var App = React.createClass({
    getInitialState: function () {
        return { player: null };
    },
    componentDidMount: function () {
        if (window) {
            window.onYouTubeIframeAPIReady = function () {
                var ytPlayer = new YT.Player('yt-player', {
                    height: '0',
                    width: '0',
                    videoId: 'GinyJlS4a_c',
                    events: {
                        'onReady': window.onPlayerReady,
                        'onStateChange': window.onPlayerStateChange
                    }
                });

                console.log('alive');

                this.setState( { player: ytPlayer });
            }.bind(this);
        }
    },
    render: function() {
        return (
            <div>
                <Header />
                <div id="content">
                    <RouteHandler />
                </div>
                <Player player={this.state.player} />
            </div>
        );
    }
});

module.exports = App;
