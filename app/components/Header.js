import React from 'react'
import { Link } from 'react-router'

class Header extends React.Component {
  render() {
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
    )
  }
}

export default Header
