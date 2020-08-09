import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';

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
      <div>
        <h1>Your List:</h1>
        <List>
          {this.state.usersMovies.map(userMovies => (
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <img src ={userMovies.poster} alt = "movie-posters"></img>
              </ListItemAvatar>
              <ListItemText
                key = {userMovies.title}
                primary={userMovies.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {userMovies.year}
                    </Typography>

                  </React.Fragment>
                }
              />
              <Divider variant="inset" component="li" />
            </ListItem>
          ))}    
        
        </List>

        {/* <GridList cellHeight={325} cols={4}>
              {this.state.trendingMovies.map(trendingMovies => (
              <GridListTile key={trendingMovies.id}>
                  <img src = {this.state.baseImageURL.concat('w300',trendingMovies.poster_path)} alt= {trendingMovies.title}></img>
                  <GridListTileBar
                    title={trendingMovies.title}
                    />  
              </GridListTile>
              ))}
              
        </GridList> */}
        <Link to="/add"><button className="btn btn-primary" >Add Movie</button></Link>
      </div>
    ) : <Redirect to="/login" />
  }
}
