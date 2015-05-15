/** @jsx React.DOM */

var React = require('react');
var moment = require('moment');

var formatTime = function (seconds) {
    return moment(0).second(seconds).format('mm:ss');
};

var Play = React.createClass({
    render: function () {

        var stateIcon = this.props.state === 'playing' ? 'icon-pause' : 'icon-play';

        return <a href="#" className="button component play" onClick={this.props.clickHandler}><i className={stateIcon}></i></a>;
    }
});

var Progress = React.createClass({
    render: function () {

        var percentage = this.props.time / this.props.duration * 100;

        return (
            <div className="progress component">
                <div className="time">{formatTime(this.props.time)}</div>
                <div className="progress-bar" onMouseDown={this.props.clickHandler} ref="progressBar"><div style={{ width: percentage + '%' }}></div></div>
                <div className="time">{formatTime(this.props.duration)}</div>
            </div>
        );
    }
});

var Player = React.createClass({
    getInitialState: function () {
        return {
            state: 'paused',
            duration: 60,
            time: 15
        };
    },
    playPause: function (e) {
        e.preventDefault();

        this.setState( { state: this.state.state === 'playing' ? 'paused' : 'playing' });
    },
    jumpTime: function (e) {
        var left = React.findDOMNode(this.refs.progress.refs.progressBar);

        console.log(left);

        //console.log(left, e.pageX, e.clientX, e.pageX);
    },
    render: function() {
        return (
            <div id="player">
                <Play state={this.state.state} clickHandler={this.playPause} />
                <Progress duration={this.state.duration} time={this.state.time} clickHandler={this.jumpTime} ref="progress" />
            </div>
        );
    }
});

module.exports = Player;
