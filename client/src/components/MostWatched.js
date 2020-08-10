import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Movie from './Movie'
import './MostWatched.scss'

export default class MostWatched extends Component {
    render() {
        return this.props.isLoggedIn ? (
            <div className="most-watched-container">
                <h2>Most Watched List</h2>
                <Movie type="most-watched" />
            </div>
        ) : <Redirect to="/login" />
    }
}