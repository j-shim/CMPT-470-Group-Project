import React, { Component } from 'react'
import UserService from '../services/UserService'
import AlertService from '../services/AlertService'
import CONSTANTS from '../constants/constants'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  onChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()

    const payload = {
      username: this.state.username,
      password: this.state.password,
    }

    UserService.login(payload)
      .then((res) => {
        console.log("Login response: " + res.data)
        console.log(res.data.token)
        // store jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem(CONSTANTS.TOKEN_KEY, res.data.token)
        this.props.setLoggedIn(true)
        AlertService.alert(this.props, 'Login successful', true)
      }).catch((err) => {
        let msg
        if (err && err.response && err.response.data) {
          msg = err.response.data.message
        } else {
          msg = err
        }
        console.error(msg)
        AlertService.alert(this.props, msg, false)
      })

  }

  render() {
    return (
      <div className="container">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input type="text"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
                className="form-control"
                placeholder="Enter username"
                required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                className="form-control"
                placeholder="Password"
                required />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    )
  }
}
