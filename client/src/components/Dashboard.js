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
          from: 30,
          to: 400
        },
        genres: [],
        averageRating: {
          from: 5.0,
          to: 10.0
        },
        numVotes: 50,
        titleIncludes: null,
        numMovies: 20
      }
    };
  }

  setFilter = (filter) => {
    this.setState({filter: filter});
  }

  render() {
    return this.props.isLoggedIn ? (
      <div>
        <h1 style={{"padding": "10px"}}>Random Movie Generator</h1>
        <div className="dashboard-container">
          <SideFilter setFilter={this.setFilter}/>
          <Movie type="dashboard" filter={this.state.filter}/>
        </div>
      </div>
    ) : <Redirect to="/login" />
  }
}
