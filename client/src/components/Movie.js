import React from 'react'
import { generateMovies } from '../services/FilterService'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import './Movie.scss'

var urlbase = "https://api.themoviedb.org/3/"
let APIKEY = "2eee6eebccdf970062dbd4c43dac66a6"

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
        };
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

      generateMovies(this.props.filter)
        .then(res => {
          console.log("Filtered movie response: " + JSON.stringify(res));

          this.setState({
            isLoaded: true,
            generatedMovies: res.data.data,
          })

          // return user
        }).catch((err) => {
          // debugger
          // console.error(err.response.data.message)
          console.error(err)
        })
    }

    componentDidUpdate(prevProps) {
      if(prevProps !== this.props) {
        this.setState({isLoaded: false})
        console.log("Changing filtered list in did update");
        generateMovies(this.props.filter)
        .then((res) => {
          console.log("Filtered movie response: " + JSON.stringify(res));

          this.setState({
            isLoaded: true,
            generatedMovies: res.data.data
          })

          // return user
        }).catch((err) => {
          // debugger
          // console.error(err.response.data.message)
          console.error(err)
        })
      }
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
          <div className="movie-container">
            <GridList cellHeight={325} cols={4}>
              {this.state.generatedMovies.map((generatedMovies, index) => (
              <GridListTile key={index}>
                  <img src = {(generatedMovies.posterPath == null) ? require('../img/default-movie-poster.png') : this.state.baseImageURL.concat('w300',generatedMovies.posterPath)} alt= {generatedMovies.primaryTitle}></img>
                  <GridListTileBar
                    title={generatedMovies.primaryTitle}
                    />  
              </GridListTile>
              ))}
            </GridList>
          </div>
        );
      }
    }
}

export default Movie;