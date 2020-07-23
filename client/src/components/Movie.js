import React from 'react'

var urlbase = "https://api.themoviedb.org/3/"
let APIKEY = "2eee6eebccdf970062dbd4c43dac66a6"

class Movie extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          trendingMovies: [],
          baseImageURL: null,
          configData: null,
        };
    }

    componentDidMount() {
        let urlconfig = "".concat(urlbase,'configuration?api_key=', APIKEY);
        let urltrending = "".concat(urlbase,'trending/movie/week?api_key=', APIKEY);
        console.log(urlconfig);
        fetch(urlconfig)
            .then(result => {
                return result.json();
            })
            .then(
            (data) => {
              this.setState({
                isLoaded: true,
                configData: data.images,
                baseImageURL: data.images.secure_base_url,
              });
              console.log(data);
              console.log(this.state.baseImageURL);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
        )
        fetch(urltrending)
            .then(res => {
                return res.json();
            })
            .then(
                (trendingdata) => {
                    this.setState({
                      trendingMovies: trendingdata.results,
                    });
                    console.log(this.state.trendingMovies);
                  },
            )
    }

    

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
          <div className = 'col-lg-3'>
          <ul>
            {this.state.trendingMovies.map(trendingMovies => (
            <li key={trendingMovies.id}>
                <img src = {this.state.baseImageURL.concat('w185',trendingMovies.poster_path)} alt="poster"></img>
                {trendingMovies.title}
            </li>
            ))}
          </ul>
          </div>
          );
        }
      }
}
export default Movie;