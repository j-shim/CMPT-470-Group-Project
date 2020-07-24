import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Movie from './Movie'

export default class Dashboard extends Component {
  render() {
    return this.props.isLoggedIn ? (
      <div>
        <h1>This is Dashboard - Movie search here</h1>
        <Movie />
      </div>
    ) : <Redirect to="/login" />
  }
}
