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
            state: 'paused',
            duration: 60,
            time: 15
        };
    },
    componentDidMount: function () {
        setInterval(this.increaseTime, 1000);
    },
    increaseTime: function () {
        if (this.state.state !== 'playing') return;

        var time = this.state.time;
        this.setState( { time: ++time % this.state.duration });
    },
    previous: function (e) {
        e.preventDefault();

        console.log('Previous');
    },
    playPause: function (e) {
        e.preventDefault();

        this.setState( { state: this.state.state === 'playing' ? 'paused' : 'playing' });
    },
    next: function (e) {
        e.preventDefault();

        console.log('Next');
    },
    jumpTime: function (e) {
        var left = React.findDOMNode(this.refs.progress.refs.progressBar);

        var percentage = (e.clientX - left.offsetLeft) / left.offsetWidth;
        var time = this.state.duration * percentage;
        console.log(percentage, time);

        this.setState( { time: time });

        //console.log(left, e.pageX, e.clientX, e.pageX);
    },
    render: function() {
        return (
            <div id="player">
                <Previous clickHandler={this.previous} />
                <Play state={this.state.state} clickHandler={this.playPause} />
                <Next clickHandler={this.next} />
                <Progress duration={this.state.duration} time={this.state.time} clickHandler={this.jumpTime} ref="progress" />
            </div>
        );
    }
});

module.exports = Player;
