import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './Dashboard.scss'
import Movie from './Movie'
import SideFilter from './SideFilter'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        type: "movie",
        isAdult: false,
        startAfter: 1950,
        endBefore: 2020,
        runtimeMinutes: {
          from: 60,
          to: 400
        },
        genres: [],
        averageRating: {
          from: 0,
          to: 10
        },
        numVotes: 1000,
        titleIncludes: null,
        numMovies: 5
      }
    };
  }

  setFilter = (filter) => {
    this.setState({filter: filter});
  }

  render() {
    return this.props.isLoggedIn ? (
      <div>
        <h1 style={{"padding": "10px"}}>This is the Dashboard - Find your movie here</h1>
        <div className="dashboard-container">
          <SideFilter setFilter={this.setFilter}/>
          <Movie filter={this.state.filter}/>
        </div>
      </div>
    ) : <Redirect to="/login" />
  }
}
