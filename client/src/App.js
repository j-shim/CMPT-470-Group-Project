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
import EditProfile from './components/EditProfile'
import Dashboard from './components/Dashboard'
import Trending from './components/Trending'
import MostWatched from './components/MostWatched'
import MostFavorite from './components/MostFavorite'
import UserList from './components/UserList'
import AddMovie from './components/AddMovie'


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
      isLoggedIn: localStorage.getItem('470isLoggedIn') !== null
    }
  }

  setLoggedIn = (isLoggedIn) => {
    this.setState({ isLoggedIn })
    if (isLoggedIn) {
      localStorage.setItem('470isLoggedIn', 'true')
    } else {
      localStorage.removeItem('470isLoggedIn')
    }
  }

  render() {
    return (
      <div className="App">
        <MenuBar isLoggedIn={this.state.isLoggedIn} setLoggedIn={this.setLoggedIn} />
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
            {!this.state.isLoggedIn && <Register setLoggedIn={this.setLoggedIn} />}
          </Route>
          <Route path="/edit-profile">
            {this.state.isLoggedIn && <EditProfile />}
            {!this.state.isLoggedIn && <Redirect to="/login" />}
          </Route>
          <Route path="/dashboard">
            <Dashboard isLoggedIn={this.state.isLoggedIn} />
          </Route>
          <Route path="/trending">
            <Trending isLoggedIn={this.state.isLoggedIn} />
          </Route>
          <Route path="/most-watched">
            <MostWatched isLoggedIn={this.state.isLoggedIn} />
          </Route>
          <Route path="/most-favorite">
            <MostFavorite isLoggedIn={this.state.isLoggedIn} />
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
