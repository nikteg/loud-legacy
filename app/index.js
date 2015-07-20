import React from 'react'
import Router, { DefaultRoute, NotFoundRoute, Route } from 'react-router'

// Apps
import App      from './components/App'
import Main     from './components/Main'
import About    from './components/About'

let routes = [
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="main" handler={Main} />
    <Route name="about" handler={About} />
    <Route name="profile" handler={About} />
  </Route>
]

if (typeof window !== 'undefined') {
  Router.run(routes, Router.HistoryLocation, (Handler, state) => {
    React.render(<Handler />, document.getElementById('react'))
  })
}

export { routes }
