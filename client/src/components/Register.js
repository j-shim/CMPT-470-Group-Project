import React, { Component } from 'react'
import UserService from '../services/UserService'
import CONSTANTS from '../constants/constants'
import ErrorHandlerService from '../services/ErrorHandlerService'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      password2: ''
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

    const payloadForRegister = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    }

    const payloadForLogin = {
      username: this.state.username,
      password: this.state.password
    }

    UserService.register(payloadForRegister)
      .then((res) => {
        UserService.login(payloadForLogin)
          .then((res) => {
            window.alert('Login successful')
            // store jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(CONSTANTS.TOKEN_KEY, res.data.token)
            this.props.setLoggedIn(true)

            // return user
          }).catch((err) => {
            ErrorHandlerService.handleError(err)
          })
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
              <label>First Name</label>
              <input type="text"
                name="firstname"
                value={this.state.firstname}
                onChange={this.onChange}
                className="form-control"
                placeholder="Enter first name"
                required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text"
                name="lastname"
                value={this.state.lastname}
                onChange={this.onChange}
                className="form-control"
                placeholder="Enter last name"
                required />
            </div>
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
            <div className="form-group">
              <label>Verify Password</label>
              <input type="password"
                name="password2"
                value={this.state.password2}
                onChange={this.onChange}
                className="form-control"
                placeholder=""
                required />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    )
  }
}
