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
import axios from 'axios'
import CONSTANTS from '../constants/constants'
import './UserList.scss';

const geturl = CONSTANTS.API_URL + '/user-movie-items/list';
const deleteurl = CONSTANTS.API_URL + '/user-movie-items/remove';
const updateurl = CONSTANTS.API_URL + '/user-movie-items/update';
const moviePosterURL = 'https://image.tmdb.org/t/p/w200';

export default class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      usersMoviefetch: [],
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleWatched = this.handleWatched.bind(this);
  }

  componentDidMount(){
    axios.get(geturl)
    .then((res) =>{
      console.log(res.data.data);
      this.setState({
        isLoaded : true,
        usersMoviefetch: res.data.data,
      });
    })
  }

  refreshList(){
    axios.get(geturl)
      .then((res) =>{
        console.log(res.data.data);
        this.setState({
          isLoaded : true,
          usersMoviefetch: res.data.data,
        });
      })
  }

  handleWatched(evt,userMovies){
    evt.preventDefault();
    const options = {
      headers: { 'Content-Type': 'application/json' }
    }

    var watch = userMovies.isWatched;
    Boolean(watch);
    watch = !watch;
    console.log(watch);
    userMovies.isWatched = watch;
    axios.put(updateurl, {tconst: userMovies.tconst, isWatched: watch}, options).then(() => {
      this.refreshList();
    });
  }

  handleFavorite(evt,userMovies){
    evt.preventDefault();

    const options = {
      headers: { 'Content-Type': 'application/json' }
    }

    var fav = userMovies.isFavorite;
    Boolean(fav);
    fav = !fav;
    console.log(fav);
    userMovies.isFavorite = fav;
    axios.put(updateurl, {tconst: userMovies.tconst, isFavorite: fav}, options).then(() => {
      this.refreshList()
    });
  }

  handleDelete(evt,userMovies){
    evt.preventDefault();

    console.log(userMovies.tconst);

    axios.delete(deleteurl, { data : {tconst: userMovies.tconst}, headers: { 'Content-Type': 'application/json' }}).then(() => {
      this.refreshList();
    })
  }

  render() {
    return this.props.isLoggedIn ? (
      <div className="userlist">
        <h1>Your List:</h1>
        <div className = "movies-list">
        <List>
          {this.state.usersMoviefetch.map(userMovies => (
            <ListItem alignItems="flex-start" key = {userMovies.id}>
              <ListItemAvatar>
                {/* <img src ={moviePosterURL.concat(userMovies.posterPath)} alt = "movie-posters"></img> */}
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="h4"
                      color="textPrimary"
                      
                    >
                      {userMovies.originalTitle}
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
                      {userMovies.startYear}
                    </Typography>
                  </React.Fragment>
                  
                }
              />
              <ListItemSecondaryAction>
                <IconButton onClick={e => this.handleWatched(e, userMovies)}>
                  <VisibilityIcon fontSize="large" color={userMovies.isWatched ? "primary": "disabled"}/>
                </IconButton>
                <IconButton onClick={e => this.handleFavorite(e, userMovies)}>
                  <FavoriteIcon fontSize="large" color={userMovies.isFavorite ? "secondary": "disabled"} />
                </IconButton>
                <IconButton onClick={e => this.handleDelete(e, userMovies)}>
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
