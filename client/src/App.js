import React, { Component } from 'react'
import './App.scss'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import axios from 'axios'
import CONSTANTS from './constants/constants'

import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

function axiosInterceptors() {
  // Sets Authorization header to 'Bearer <token>
  axios.interceptors.request.use(
    config => {
      const { origin } = new URL(config.url)
      const allowedOrigins = [CONSTANTS.API_URL]
      const token = localStorage.getItem(CONSTANTS.TOKEN_KEY)
      if (allowedOrigins.includes(origin)) {
        config.headers.authorization = `Bearer ${token}`
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    axiosInterceptors()
    this.state = {
      isLoggedIn: false
    }
  }

  setLoggedIn = (isLoggedInOrNot) => {
    this.setState({ isLoggedIn: isLoggedInOrNot })
  }

  render() {
    return (
      <div className="App" >
        <Navbar isLoggedIn={this.state.isLoggedIn} setLoggedIn={this.setLoggedIn} />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            {this.state.isLoggedIn && <Redirect to="/dashboard" />}
            {!this.state.isLoggedIn && <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            {this.state.isLoggedIn && <Redirect to="/dashboard" />}
            {!this.state.isLoggedIn && <Login setLoggedIn={this.setLoggedIn} />}
          </Route>
          <Route path="/register">
            {this.state.isLoggedIn && <Redirect to="/dashboard" />}
            {!this.state.isLoggedIn && <Register />}
          </Route>
          <Route path="/dashboard">
            <Dashboard isLoggedIn={this.state.isLoggedIn} />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default App
