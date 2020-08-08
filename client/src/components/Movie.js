import React from 'react'
import { generateMovies } from '../services/FilterService'
// import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
// import PropTypes from 'prop-types'
import './Movie.scss'

// var urlbase = "https://api.themoviedb.org/3/"
// let APIKEY = "2eee6eebccdf970062dbd4c43dac66a6"

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
      generateMovies(this.props.filters)
        .then((res) => {
          console.log("Filtered movie response: " + res);

          this.setState({
            isLoaded: true,
            generatedMovies: res
          })

          // return user
        }).catch((err) => {
          // debugger
          // console.error(err.response.data.message)
          console.error(err)
        })
    }

    // componentDidMount() {
    //     let urlconfig = "".concat(urlbase,'configuration?api_key=', APIKEY);
    //     let urltrending = "".concat(urlbase,'trending/movie/week?api_key=', APIKEY);
        
    //     console.log(urlconfig);
    //     console.log("Trending: " + this.props.activeTrending);

    //     fetch(urlconfig)
    //         .then(result => {
    //             return result.json();
    //         })
    //         .then(
    //         (data) => {
    //           this.setState({
    //             isLoaded: true,
    //             configData: data.images,
    //             baseImageURL: data.images.secure_base_url,
    //           });
    //           console.log(data);
    //           console.log(this.state.baseImageURL);
    //         },
    //         // Note: it's important to handle errors here
    //         // instead of a catch() block so that we don't swallow
    //         // exceptions from actual bugs in components.
    //         (error) => {
    //           this.setState({
    //             isLoaded: true,
    //             error
    //           });
    //         }
    //     )
    //     fetch(urltrending)
    //         .then(res => {
    //             return res.json();
    //         })
    //         .then(
    //             (trendingdata) => {
    //                 this.setState({
    //                   trendingMovies: trendingdata.results,
    //                 });
    //                 console.log(this.state.trendingMovies);
    //               },
    //         )
    // }

    // trendingSearch = (trendingInput) => {
    //   let urlconfig = "".concat(urlbase,'configuration?api_key=', APIKEY);
    //   let urltrending = "".concat(urlbase,'trending/movie/', trendingInput,'?api_key=', APIKEY);

    //   fetch(urlconfig)
    //       .then(result => {
    //           return result.json();
    //       })
    //       .then(
    //       (data) => {
    //         this.setState({
    //           isLoaded: true,
    //           configData: data.images,
    //           baseImageURL: data.images.secure_base_url,
    //         });
    //         console.log(data);
    //         console.log(this.state.baseImageURL);
    //       },
    //       (error) => {
    //         this.setState({
    //           isLoaded: true,
    //           error
    //         });
    //       }
    //   )
    //   fetch(urltrending)
    //       .then(res => {
    //           return res.json();
    //       })
    //       .then(
    //           (trendingdata) => {
    //               this.setState({
    //                 trendingMovies: trendingdata.results,
    //               });
    //               console.log(this.state.trendingMovies);
    //             },
    //       )
    // }

    componentDidUpdate(prevProps) {
      if(prevProps !== this.props) {
        console.log("Changing filtered list");
        generateMovies(this.props.filters)
        .then((res) => {
          console.log("Filtered movie response: " + res)

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
        return <div>Loading...</div>;
      } else {
        return (
          <div className="movie-container">
            <GridList cellHeight={325} cols={4}>
              {this.state.trendingMovies.map(trendingMovies => (
              <GridListTile key={trendingMovies.id}>
                  <img src = {this.state.baseImageURL.concat('w300',trendingMovies.poster_path)} alt= {trendingMovies.title}></img>
                  <GridListTileBar
                    title={trendingMovies.title}
                    />  
              </GridListTile>
              ))}
            </GridList>
          </div>
        );
      }
    }
}

// Movie.propTypes = {
//   // activeTrending: PropTypes.string.isRequired
// };

export default Movie;