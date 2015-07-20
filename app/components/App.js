import React from 'react'
import Header from './Header'
import Player from './Player'
import Main from './Main'

import { RouteHandler } from 'react-router'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      player: null
    }
  }

  /*
  The global window variable can be used here as componentDidMount will ONLY
  be called on the client side and not when the server renders the component.
  */
  componentDidMount() {
    window.onYouTubeIframeAPIReady = () => {
      let ytPlayer = new YT.Player('yt-player', {
        height: '0',
        width: '0',
        videoId: 'GinyJlS4a_c',
        events: {
          'onReady': window.onPlayerReady,
          'onStateChange': window.onPlayerStateChange
        }
      })

      this.setState( { player: ytPlayer })
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div id="content">
          <RouteHandler />
        </div>
        <Player player={this.state.player} />
      </div>
    )
  }
}

export default App
