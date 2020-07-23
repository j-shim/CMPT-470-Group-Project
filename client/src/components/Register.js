import React, { Component } from 'react'
import UserService from '../services/UserService'

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

    const payload = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    }

    UserService.register(payload)
      .then((res) => {
        console.log(res)
        // auto login user
      }).catch((err) => {
        // debugger
        // console.error(err.response.data.message)
        console.error(err)
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
