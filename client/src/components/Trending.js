import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Movie from './Movie'
import './Trending.scss'

export default class Trending extends Component {
    render() {
        return this.props.isLoggedIn ? (
            <div className="trending-container">
                <h2>Trending List</h2>
                <Movie type="trending" />
            </div>
        ) : <Redirect to="/login" />
    }
}