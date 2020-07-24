import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './Dashboard.scss'
import Movie from './Movie'
import SideFilter from './SideFilter'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFiltered: false,
      filters: []
    };
  }

  setIsFiltered = (isFiltered) => {
    this.setState({ isFiltered: isFiltered })
  }

  render() {
    return this.props.isLoggedIn ? (
      <div>
        <h1>This is Dashboard - Movie search here</h1>
        <div className="dashboard-container">
          <SideFilter setIsFiltered={this.setIsFiltered} />
          <Movie isFiltered={this.state.isFiltered} />
        </div>
      </div>
    ) : <Redirect to="/login" />
  }
}
