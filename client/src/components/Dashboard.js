import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './Dashboard.scss'
import Movie from './Movie'
import SideFilter from './SideFilter'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //isFiltered: false,
      // filters: [
      //   {activeTrending: "week"}
      // ]
      activeTrending: "week"
    };
  }

  // setIsFiltered = (isFiltered) => {
  //   this.setState({ isFiltered: isFiltered })
  // }

  setActiveTrending = (activeTrending) => {
    console.log("Setting active trending");
    this.setState({ activeTrending: activeTrending });
  }

  render() {
    return this.props.isLoggedIn ? (
      <div>
        <h1 style={{"padding": "10px"}}>This is the Dashboard - Find your movie here</h1>
        <div className="dashboard-container">
          <SideFilter setActiveTrending={this.setActiveTrending}/>
          <Movie activeTrending={this.state.activeTrending}/>
        </div>
      </div>
    ) : <Redirect to="/login" />
  }
}
