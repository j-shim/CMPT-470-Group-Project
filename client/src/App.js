import React, { Component } from 'react'
import './App.scss'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import axios from 'axios'
import CONSTANTS from './constants/constants'

import MenuBar from './components/MenuBar'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Trending from './components/Trending'
import UserList from './components/UserList'
import AddMovie from './components/AddMovie'
import Alert from './components/Alert'

function axiosInterceptors() {
  // Sets Authorization header to 'Bearer <token>
  axios.interceptors.request.use(
    config => {
      if (process.env.NODE_ENV === 'production') {
        const token = localStorage.getItem(CONSTANTS.TOKEN_KEY)
        if (config.url.includes(CONSTANTS.API_URL)) {
          config.headers.authorization = `Bearer ${token}`
        }
        return config
      } else {
        const { origin } = new URL(config.url)
        const allowedOrigins = [CONSTANTS.API_URL]
        const token = localStorage.getItem(CONSTANTS.TOKEN_KEY)
        if (allowedOrigins.includes(origin)) {
          config.headers.authorization = `Bearer ${token}`
        }
        return config
      }
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
      isLoggedIn: false,
      alerts: {
        message: '',
        isSuccess: false,
        timeoutId: undefined
      }
    }
  }

  setLoggedIn = (isLoggedInOrNot) => {
    this.setState({
      isLoggedIn: isLoggedInOrNot
    })
  }

  setAlerts = (newAlert) => {
    if (typeof this.state.alerts.timeoutId === 'number') {
      clearTimeout(this.state.alerts.timeoutId)
    }
    this.setState({
      alerts: {
        message: newAlert.message,
        isSuccess: newAlert.isSuccess,
        timeoutId: setTimeout(() => {
          this.setState({
            alerts: {
              message: '',
              timeoutId: undefined
            }
          })
        }, 10000)
      }
    })
  }

  render() {
    return (
      <div className="App">
        <MenuBar isLoggedIn={this.state.isLoggedIn} setLoggedIn={this.setLoggedIn} />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Alert alerts={this.state.alerts} />
        <Switch>
          <Route exact path="/">
            {this.state.isLoggedIn && <Redirect to="/dashboard" />}
            {!this.state.isLoggedIn && <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            {this.state.isLoggedIn && <Redirect to="/dashboard" />}
            {!this.state.isLoggedIn && <Login setLoggedIn={this.setLoggedIn} setAlerts={this.setAlerts} />}
          </Route>
          <Route path="/register">
            {this.state.isLoggedIn && <Redirect to="/dashboard" />}
            {!this.state.isLoggedIn && <Register setLoggedIn={this.setLoggedIn} setAlerts={this.setAlerts} />}
          </Route>
          <Route path="/dashboard">
            <Dashboard isLoggedIn={this.state.isLoggedIn} />
          </Route>
          <Route path="/trending">
            <Trending isLoggedIn={this.state.isLoggedIn} />
          </Route>
          <Route path="/list">
            <UserList isLoggedIn={this.state.isLoggedIn} />
          </Route>
          <Route path="/add">
            <AddMovie isLoggedIn={this.state.isLoggedIn} />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default App
