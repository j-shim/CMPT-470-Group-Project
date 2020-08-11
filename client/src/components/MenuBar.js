import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import CONSTANTS from '../constants/constants'

export default class MenuBar extends Component {
  // https://getbootstrap.com/docs/4.0/components/navbar/

  logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem(CONSTANTS.TOKEN_KEY)
    localStorage.removeItem('470isLoggedIn')
    this.props.setLoggedIn(false)
    window.alert('Logout successful')
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
                {this.props.isLoggedIn ?
                  <NavLink to="/dashboard" activeClassName="active" className="nav-link">Dashboard</NavLink>
                  : <span style={{ color: 'white' }}>Welcome to Movie Database</span>}
              </li>
              <li className="nav-item">
                {this.props.isLoggedIn ?
                  <NavLink to="/trending" activeClassName="active" className="nav-link">Trending</NavLink>
                  : <span></span>}
              </li>
              <li className="nav-item">
                {this.props.isLoggedIn ?
                  <NavLink to="/most-watched" activeClassName="active" className="nav-link">Most Watched</NavLink>
                  : <span></span>}
              </li>
              <li className="nav-item">
                {this.props.isLoggedIn ?
                  <NavLink to="/most-favorite" activeClassName="active" className="nav-link">Most Favorite</NavLink>
                  : <span></span>}
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                {this.props.isLoggedIn ?
                  <div className="dropdown">
                    <button style={{ color: 'white' }} className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      My Account
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <NavLink style={{ backgroundColor: 'white', color: 'black' }} to="/list" activeClassName="active" className="dropdown-item">My List</NavLink>
                      <NavLink style={{ backgroundColor: 'white', color: 'black' }} to="/edit-profile" activeClassName="active" className="dropdown-item">Edit Profile</NavLink>
                      <span onClick={this.logout} style={{ cursor: 'pointer' }} className="dropdown-item" id="logout-button">Logout</span>

                    </div>
                  </div>
                  : <NavLink to="/login" activeClassName="active" className="nav-link">Login</NavLink>}
              </li>

              <li className="nav-item">
                {this.props.isLoggedIn ?
                  <span></span>
                  : <NavLink to="/register" activeClassName="active" className="nav-link">Register</NavLink>}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}