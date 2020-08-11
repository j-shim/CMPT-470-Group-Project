import React, { Component } from 'react'
import UserService from '../services/UserService'
import CONSTANTS from '../constants/constants'
import ErrorHandlerService from '../services/ErrorHandlerService'

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
        window.alert('Login successful')
        // store jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem(CONSTANTS.TOKEN_KEY, res.data.token)
        this.props.setLoggedIn(true)

        // return user
      }).catch((err) => {
        ErrorHandlerService.handleError(err)
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
