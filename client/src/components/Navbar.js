import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import CONSTANTS from '../constants/constants'

export default class Navbar extends Component {
  // https://getbootstrap.com/docs/4.0/components/navbar/

  logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem(CONSTANTS.TOKEN_KEY)
    this.props.setLoggedIn(false)
    console.log('Logout successful')
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">Home</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink to="/dashboard" activeClassName="active" className="nav-link">Dashboard</NavLink>
              </li>
              <li className="nav-item">
                {this.props.isLoggedIn ?
                  <span onClick={this.logout} className="nav-link">Logout</span>
                  : <NavLink to="/login" activeClassName="active" className="nav-link">Login</NavLink>}
              </li>
              <li className="nav-item">
                <NavLink to="/register" activeClassName="active" className="nav-link">Register</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}
