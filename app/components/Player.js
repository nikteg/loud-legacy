/** @jsx React.DOM */

var React = require('react');
var moment = require('moment');

var formatTime = function (seconds) {
    return moment(0).second(seconds).format('mm:ss');
};

var Previous = React.createClass({
    render: function () {
        return <a href="#" className="button component previous" onClick={this.props.clickHandler}><i className="icon-step-backward"></i></a>;
    }
});

var Play = React.createClass({
    render: function () {
        var stateIcon = this.props.state === 1 ? 'icon-pause' : 'icon-play';

        return <a href="#" className="button component play" onClick={this.props.clickHandler}><i className={stateIcon}></i></a>;
    }
});

var Next = React.createClass({
    render: function () {
        return <a href="#" className="button component next" onClick={this.props.clickHandler}><i className="icon-step-forward"></i></a>;
    }
});

var Progress = React.createClass({
    render: function () {

        var percentage = this.props.time / this.props.duration * 100;

        return (
            <div className="progress">
                <div className="time">{formatTime(this.props.time)}</div>
                <div className="progress-bar" onMouseDown={this.props.clickHandler} ref="progressBar">
                    <div className="bg"></div>
                    <div className="bar" style={{ width: percentage + '%' }}>
                        <div className="knob"></div>
                    </div>
                </div>
                <div className="time">{formatTime(this.props.duration)}</div>
            </div>
        );
    }
});

var Player = React.createClass({
    getInitialState: function () {
        return {
            state: 'paused',
            time: 0,
            duration: 1
        };
    },
    componentDidMount: function () {
        if (window) {
            window.onPlayerReady = this.onPlayerReady;
            window.onPlayerStateChange = this.onPlayerStateChange;
        }
    },
    shouldComponentUpdate: function (nextProps) {
        return (nextProps.player !== undefined);
    },
    componentWillReceiveProps: function (nextProps) {
        setInterval(this.increaseTime, 500);
    },
    increaseTime: function () {
        if (this.state.state !== 1) return;

        this.setState( { time: this.props.player.getCurrentTime(), duration: this.props.player.getDuration() } );
    },
    previous: function (e) {
        if (e) e.preventDefault();

        //this.setState( { currentTrack: (this.state.currentTrack === 0) ? (this.state.queue.length - 1) : (this.state.currentTrack - 1), time: 0 });
    },
    playPause: function (e) {
        e.preventDefault();

        if (this.state.state == YT.PlayerState.PLAYING) {
            this.props.player.pauseVideo();
        } else {
            this.props.player.playVideo();
        }
    },
    next: function (e) {
        if (e) e.preventDefault();

        //this.setState( { currentTrack: (this.state.currentTrack + 1) % this.state.queue.length, time: 0 });
    },
    jumpTime: function (e) {
        e.preventDefault();

        var bar = React.findDOMNode(this.refs.progress.refs.progressBar);
        var percentage = (e.clientX - bar.offsetLeft) / bar.offsetWidth;

        this.props.player.seekTo(this.state.duration * percentage);
    },
    getTitle: function () {
        return 'Track title';
    },
    onPlayerReady: function (player) {
        console.log('Player ready', player);
    },
    onPlayerStateChange: function (state) {
        this.setState( { state: state.data });
        console.log('Player state changed', state.data);
    },
    render: function() {
        return (
            <div id="player">
                <div id="yt-player"></div>
                <div className="title">{this.getTitle()}</div>
                <Previous clickHandler={this.previous} />
                <Play state={this.state.state} clickHandler={this.playPause} />
                <Next clickHandler={this.next} />
                <Progress duration={this.state.duration} time={this.state.time} clickHandler={this.jumpTime} ref="progress" />
            </div>
        );
    }
});

module.exports = Player;
