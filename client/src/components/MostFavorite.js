import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Movie from './Movie'
import './MostFavorite.scss'

export default class MostFavorite extends Component {
    render() {
        return this.props.isLoggedIn ? (
            <div className="most-favorite-container">
                <h2>Most Favorite List</h2>
                <Movie type="most-favorite" />
            </div>
        ) : <Redirect to="/login" />
    }
}