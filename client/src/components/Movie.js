import React from 'react'
import { generateMovies } from '../services/FilterService'
import { generateTrendingMovies } from '../services/TrendingService'
import { generateMostWatchedMovies } from '../services/MostWatchedService'
import { generateMostFavoriteMovies } from '../services/MostFavoriteService'
import ErrorHandlerService from '../services/ErrorHandlerService'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import './Movie.scss'
import axios from 'axios'
import CONSTANTS from '../constants/constants'

var urlbase = "https://api.themoviedb.org/3/"
let APIKEY = "2eee6eebccdf970062dbd4c43dac66a6"
const addurl = CONSTANTS.API_URL + '/user-movie-items/add';

class Movie extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          generatedMovies: [],
          baseImageURL: null,
          configData: null,
          width: "100%"
        };
        this.handleAdd = this.handleAdd.bind(this);
    }

    componentDidMount() {
      let urlconfig = "".concat(urlbase,'configuration?api_key=', APIKEY);

      fetch(urlconfig)
          .then(result => {
              return result.json();
          })
          .then(
          (data) => {
            this.setState({
              configData: data.images,
              baseImageURL: data.images.secure_base_url,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
      )

      if (this.props.type === "dashboard") {
        generateMovies(this.props.filter)
        .then(res => {

          this.setState({
            isLoaded: true,
            width: "60%",
            generatedMovies: res.data.data,
          })

        }).catch((err) => {
          ErrorHandlerService.handleError(err)
        })
      }else if (this.props.type === "trending") {
        generateTrendingMovies()
        .then(res => {

          this.setState({
            isLoaded: true,
            width: "100%",
            generatedMovies: res.data.data,
          })

        }).catch((err) => {
          ErrorHandlerService.handleError(err)
        })
      }else if (this.props.type === "most-watched") {
        generateMostWatchedMovies()
        .then(res => {

          this.setState({
            isLoaded: true,
            width: "100%",
            generatedMovies: res.data.data,
          })

        }).catch((err) => {
          ErrorHandlerService.handleError(err)
        })
      }else if (this.props.type === "most-favorite") {
        generateMostFavoriteMovies()
        .then(res => {

          this.setState({
            isLoaded: true,
            width: "100%",
            generatedMovies: res.data.data,
          })

        }).catch((err) => {
          ErrorHandlerService.handleError(err)
        })
      }
    }

    componentDidUpdate(prevProps) {
      if(prevProps !== this.props) {
        this.setState({isLoaded: false})
        generateMovies(this.props.filter)
        .then((res) => {

          this.setState({
            isLoaded: true,
            generatedMovies: res.data.data
          })

        }).catch((err) => {
          ErrorHandlerService.handleError(err)
        })
      }
    }

    handleAdd(evt,generatedMovies){
      evt.preventDefault();
      const options = {
        headers: { 'Content-Type': 'application/json' }
      }
      axios.post(addurl, {tconst: generatedMovies.tconst}, options).then(res => {
        window.alert(res.data.message)
      })
    }
  

    render() {
      const { error, isLoaded } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return (
          <div className="spinner-border text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )
      } else {
        return (
          <div className="movie-container" style={{width: this.state.width}}>
            <GridList cellHeight={340} cols={5}>
              {this.state.generatedMovies.map((generatedMovies, index) => (
                <GridListTile className="flip-card" key={index}>
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <img className="dashboard-img" src={(generatedMovies.posterPath == null) ? require('../img/default-movie-poster.png') : this.state.baseImageURL.concat('w300',generatedMovies.posterPath)} alt= {generatedMovies.primaryTitle}></img>
                      <GridListTileBar
                        title={generatedMovies.primaryTitle}
                      />  
                    </div>
                    
                    <div className="flip-card-back">
                      <p>
                        Genre: {generatedMovies.genres}
                      </p> 
                      <p>Year: {generatedMovies.startYear}</p> 
                      <p>Average Rating: {generatedMovies.averageRating}</p> 
                      <p>Vote: {generatedMovies.numVotes}</p>
                      <p>Runtime: {generatedMovies.runtimeMinutes} minutes</p>
                      <div className="movie-buttons">
                        <a href={"".concat("https://www.imdb.com/title/", generatedMovies.tconst)}>
                          <button className="imdb-button"><strong>IMDb</strong></button>
                        </a>
                        <button className="add-movie-button" onClick={e => this.handleAdd(e, generatedMovies)} >+</button>
                      </div>
                    </div>
                  </div>
                </GridListTile>
                ))}
            </GridList>
          </div>
        );
      }
    }
}

export default Movie;