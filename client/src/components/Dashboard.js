import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Dashboard extends Component {
  render() {
    return this.props.isLoggedIn ? (
      <div>
        <h1>This is Dashboard - Movie search here</h1>
      </div>
    ) : <Redirect to="/login" />
  }
}
