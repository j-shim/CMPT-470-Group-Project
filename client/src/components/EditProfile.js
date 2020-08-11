import React, { Component } from 'react'
import UserService from '../services/UserService'
import CONSTANTS from '../constants/constants'
import ErrorHandlerService from '../services/ErrorHandlerService'

export default class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      password0: '',
      password1: '',
      password2: ''
    }
  }

  componentDidMount() {
    UserService.getCurrentUser()
      .then((res) => {
        this.setState({
          firstname: res.data.firstname,
          lastname: res.data.lastname
        })
      }).catch((err) => {
        ErrorHandlerService.handleError(err)
      })
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
      password0: this.state.password0,
      password1: this.state.password1,
      password2: this.state.password2
    }

    UserService.editProfile(payload)
      .then((res) => {
        // store jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem(CONSTANTS.TOKEN_KEY, res.data.token)
        window.alert('Profile updated successfully')
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
              <label>Current Password</label>
              <input type="password"
                name="password0"
                value={this.state.password}
                onChange={this.onChange}
                className="form-control"
                placeholder="Enter Current Password"
                required />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password"
                name="password1"
                value={this.state.password}
                onChange={this.onChange}
                className="form-control"
                placeholder="Enter New Password"
                required />
            </div>
            <div className="form-group">
              <label>Verify Password</label>
              <input type="password"
                name="password2"
                value={this.state.password2}
                onChange={this.onChange}
                className="form-control"
                placeholder="Verify Password"
                required />
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    )
  }
}
