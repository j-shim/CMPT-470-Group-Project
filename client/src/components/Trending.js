import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Movie from './Movie'
import './Trending.scss'

export default class Trending extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activeTrending: "week"
        };
    }

    render() {
        return this.props.isLoggedIn ? (
            <div className="trending-container">
                <h2>Trending List</h2>
                <ul>
                    <li>
                        Weekly
                    </li>
                    <li>
                        Daily
                    </li>
                </ul>
                <Movie activeTrending={this.state.activeTrending}/>
            </div>
        ) : <Redirect to="/login" />
    }


}