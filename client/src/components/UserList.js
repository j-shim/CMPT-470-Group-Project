import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
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
        "Jaws", "Parasite", "Toy Story 3", "Saving Private Ryan"
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
                <img src ="https://image.tmdb.org/t/p/w200/tqXiOD5rTyHgabO73Tpw9JDbd88.jpg"></img>
              </ListItemAvatar>
              <ListItemText
                primary={userMovies}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Movie Year here
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
        <button className="btn btn-primary">Add Movie</button>
      </div>
    ) : <Redirect to="/login" />
  }
}
