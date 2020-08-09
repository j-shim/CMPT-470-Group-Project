import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import './UserList.scss';

export default class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      usersMovies: [
        {
          title: "Jaws",
          year: 1997,
          poster: "https://image.tmdb.org/t/p/w200/s2xcqSFfT6F7ZXHxowjxfG0yisT.jpg"
        },
        {
          title: "Joker",
          year: 2019,
          poster: "https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
        },
        {
          title: "Toy Story 3",
          year: 2010,
          poster: "http://image.tmdb.org/t/p/w200/4cpGytCB0eqvRks4FAlJoUJiFPG.jpg"
        }
      ],
      usersMoviePosterURL: [],
    }
  }


  render() {
    return this.props.isLoggedIn ? (
      <div className="userlist">
        <h1>Your List:</h1>
        <div className = "movies-list">
        <List>
          {this.state.usersMovies.map(userMovies => (
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <img src ={userMovies.poster} alt = "movie-posters"></img>
              </ListItemAvatar>
              <ListItemText
                key = {userMovies.title}
                primary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="h3"
                      color="textPrimary"
                      
                    >
                      {userMovies.title}
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="h5"
                      color="textPrimary"
                    >
                      {userMovies.year}
                    </Typography>
                  </React.Fragment>
                  
                }
              />
              <ListItemSecondaryAction>
                <IconButton>
                  <VisibilityIcon color="disabled" fontSize="large"/>
                </IconButton>
                <IconButton>
                  <FavoriteIcon fontSize="large" />
                </IconButton>
                <IconButton>
                  <DeleteIcon fontSize="large"/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}    
        
        </List>
        </div>
        <Link to="/add"><button className="btn btn-primary" >Add Movie</button></Link>
      </div>
    ) : <Redirect to="/login" />
  }
}
