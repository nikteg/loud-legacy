import React from 'react'
import moment from 'moment'

let formatTime = (seconds) => {
  return moment(0).second(seconds).format('mm:ss')
}

class Previous extends React.Component {
  render() {
    return (
      <a href="#" className="button component previous" onClick={this.props.clickHandler}>
        <i className="icon-step-backward"></i>
      </a>
    )
  }
}

class Play extends React.Component {
  render() {
    let stateIcon = this.props.state === 1 ? 'icon-pause' : 'icon-play'

    return (
      <a href="#" className="button component play" onClick={this.props.clickHandler}>
        <i className={stateIcon}></i>
      </a>
    )
  }
}

class Next extends React.Component {
  render() {
    return (
      <a href="#" className="button component next" onClick={this.props.clickHandler}>
        <i className="icon-step-forward"></i>
      </a>
    )
  }
}

class Progress extends React.Component {
  render() {
    let percentage = this.props.time / this.props.duration * 100

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
    )
  }
}

class Player extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      state: 'paused',
      time: 0,
      duration: 1
    }
  }

  componentDidMount() {
    window.onPlayerReady = this.onPlayerReady
    window.onPlayerStateChange = this.onPlayerStateChange
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.player !== 'undefined')
  }

  componentWillReceiveProps(nextProps) {
    setInterval(this.increaseTime, 500)
  }

  increaseTime = () => {
    if (this.state.state !== 1) return

    this.setState( { time: this.props.player.getCurrentTime(), duration: this.props.player.getDuration() } )
  }

  previous = (e) => {
    if (e) e.preventDefault()

    //this.setState( { currentTrack: (this.state.currentTrack === 0) ? (this.state.queue.length - 1) : (this.state.currentTrack - 1), time: 0 })
  }

  playPause = (e) => {
    e.preventDefault()

    if (this.state.state == YT.PlayerState.PLAYING) {
      this.props.player.pauseVideo()
    } else {
      this.props.player.playVideo()
    }
  }

  next = (e) => {
    if (e) e.preventDefault()

    //this.setState( { currentTrack: (this.state.currentTrack + 1) % this.state.queue.length, time: 0 })
  }

  jumpTime = (e) => {
    e.preventDefault()

    var bar = React.findDOMNode(this.refs.progress.refs.progressBar)
    var percentage = (e.clientX - bar.offsetLeft) / bar.offsetWidth

    this.props.player.seekTo(this.state.duration * percentage)
  }

  getTitle = () => {
    return 'Track title'
  }

  onPlayerReady = (player) => {
    console.log('Player ready', player)
  }

  onPlayerStateChange = (state) => {
    this.setState( { state: state.data })
    console.log('Player state changed', state.data)
  }

  render() {
    return (
      <div id="player">
        <div className="title">{this.getTitle()}</div>
        <Previous clickHandler={this.previous} />
        <Play state={this.state.state} clickHandler={this.playPause} />
        <Next clickHandler={this.next} />
        <Progress duration={this.state.duration} time={this.state.time} clickHandler={this.jumpTime} ref="progress" />
      </div>
    )
  }
}

export default Player
