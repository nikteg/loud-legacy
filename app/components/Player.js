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

        var stateIcon = this.props.state === 'playing' ? 'icon-pause' : 'icon-play';

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
            queue: [
                { title: 'Track 1', duration: 40 },
                { title: 'Track 2', duration: 20 },
                { title: 'Track 3', duration: 60 }
            ],
            state: 'paused',
            time: 0,
            currentTrack: 0
        };
    },
    componentWillMount: function () {

    },
    componentDidMount: function () {
        setInterval(this.increaseTime, 1000);
    },
    increaseTime: function () {
        if (this.state.state !== 'playing') return;

        if ((this.state.time + 1) >= this.getCurrentTrack().duration) {
            this.next();
        }

        this.setState( { time: (this.state.time + 1) % this.getCurrentTrack().duration });
    },
    getCurrentTrack: function () {
        return this.state.queue[this.state.currentTrack];
    },
    previous: function (e) {
        if (e) e.preventDefault();

        this.setState( { currentTrack: (this.state.currentTrack === 0) ? (this.state.queue.length - 1) : (this.state.currentTrack - 1), time: 0 });
    },
    playPause: function (e) {
        e.preventDefault();

        this.setState( { state: this.state.state === 'playing' ? 'paused' : 'playing' });
    },
    next: function (e) {
        if (e) e.preventDefault();

        this.setState( { currentTrack: (this.state.currentTrack + 1) % this.state.queue.length, time: 0 });
    },
    jumpTime: function (e) {
        var bar = React.findDOMNode(this.refs.progress.refs.progressBar);
        var percentage = (e.clientX - bar.offsetLeft) / bar.offsetWidth;

        this.setState( { time: this.getCurrentTrack().duration * percentage });
    },
    render: function() {
        return (
            <div id="player">
                <div className="title">{this.getCurrentTrack().title}</div>
                <Previous clickHandler={this.previous} />
                <Play state={this.state.state} clickHandler={this.playPause} />
                <Next clickHandler={this.next} />
                <Progress duration={this.getCurrentTrack().duration} time={this.state.time} clickHandler={this.jumpTime} ref="progress" />
            </div>
        );
    }
});

module.exports = Player;
