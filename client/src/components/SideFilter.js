import React, { Component } from 'react'
import Slider from '@material-ui/core/Slider'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import './SideFilter.scss'

export default class SideFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genreButtons: [
                {name: "Action", bgColor: "white"},
                {name: "Adventure", bgColor: "white"},
                {name: "Animation", bgColor: "white"},
                {name: "Comedy", bgColor: "white"},
                {name: "Documentary", bgColor: "white"},
                {name: "Drama", bgColor: "white"},
                {name: "Family", bgColor: "white"},
                {name: "Fantasy", bgColor: "white"},
                {name: "Horror", bgColor: "white"},
                {name: "Mystery", bgColor: "white"},
                {name: "Romance", bgColor: "white"},
                {name: "Sci-Fi", bgColor: "white"},
                {name: "Thriller", bgColor: "white"},
                {name: "War", bgColor: "white"}
            ],
            numMoviesButtons: [
                {name: 5, bgColor: "white"},
                {name: 10, bgColor: "white"},
                {name: 20, bgColor: "white"},
                {name: 50, bgColor: "white"},
                {name: 75, bgColor: "white"},
                {name: 100, bgColor: "white"},
            ],
            filter: {
                type: "movie",
                isAdult: false,
                startAfter: 1950,
                endBefore: 2020,
                runtimeMinutes: {
                    from: 30, 
                    to: 400
                },
                genres: [],
                averageRating: {
                    from: 5.0,
                    to: 10.0
                },
                numVotes: 50,
                titleIncludes: null,
                numMovies: 20
            }
        }
    }

    genreOnClick(index) {
        let temp = this.state.genreButtons;
        let tempFilter = this.state.filter;

        if(temp[index].bgColor === "orange") {
            temp[index].bgColor = "white";

            for(let i = 0; i < tempFilter.genres.length; i++) {
                if(tempFilter.genres[i] === temp[index].name) {
                    tempFilter.genres.splice(i, 1);
                    break;
                }
            }


        }else if (temp[index].bgColor === "white") {
            temp[index].bgColor = "orange";

            tempFilter.genres.push(temp[index].name)
        }

        this.setState({genreButtons: temp});
        this.setState({filter: tempFilter});
    }

    numMoviesOnClick(index) {
        let temp = this.state.numMoviesButtons;
        let tempFilter = this.state.filter;

        if (temp[index].bgColor === "white") {
            for(let i = 0; i < temp.length; i++) {
                if(i !== index) {
                    temp[i].bgColor = "white";
                }else {
                    temp[i].bgColor = "orange";
                }
            }
        }

        tempFilter.numMovies = temp[index].name;

        this.setState({numMoviesButtons: temp});
        this.setState({filter: tempFilter});
    }

    filterOnClick() {
        this.props.setFilter(this.state.filter);
    }

    render() {
        return (
            <div className="filter">
                <h2>Filters</h2>
                <hr/>
                <div className="isAdult-filter filter-container">
                    <h5>Adult</h5>
                        <Checkbox
                            onChange={(event) => {
                                let tempFilter = this.state.filter;
                                tempFilter.isAdult = event.target.checked;
                                this.setState({filter: tempFilter});
                            }}
                        />
                        <label>Adult Content</label>
                </div>
                <div className="type-filter filter-container">
                    <h5>Type</h5>
                    <FormControl className="type-filter" component="fieldset">
                        <RadioGroup aria-label="type" name="type" value={this.state.filter.type} onChange={(event) => {
                            let tempFilter = this.state.filter;
                            tempFilter.type = event.target.value;
                            this.setState({filter: tempFilter});
                        }}>
                            <FormControlLabel value="movie" control={<Radio />} label="Movie" />
                            <FormControlLabel value="tvSeries" control={<Radio />} label="TV Series" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="genre-filter filter-container">
                    <h5>Genres</h5>
                    {this.state.genreButtons.map((genre, index) => 
                        <button className="buttons" style={{backgroundColor:this.state.genreButtons[index].bgColor}} key={index} onClick={() => this.genreOnClick(index)}>
                            {genre.name}
                        </button>
                    )}
                </div>
                <div className="year-filter filter-container">
                    <h5>Year</h5>
                    <Slider 
                        value={[this.state.filter.startAfter, this.state.filter.endBefore]}
                        min={1900}
                        max={2020}
                        marks={[
                            {
                                value: 1900,
                                label: '1900'
                            },
                            {
                                value: 1950,
                                label: '1950'
                            },
                            {
                                value: 2000,
                                label: '2000'
                            },
                            {
                                value: 2020,
                                label: '2020'
                            }
                        ]}
                        step={1}
                        onChange={(event, newValue) => {
                            let tempFilter = this.state.filter;
                            tempFilter.startAfter = newValue[0];
                            tempFilter.endBefore = newValue[1];
                            this.setState({filter: tempFilter});
                        }}
                        valueLabelDisplay="auto"
                        aira-labelledby="range-slider"
                    />
                </div>
                <div className="runtime-filter filter-container">
                    <h5>Runtime</h5>
                    <Slider 
                        value={[this.state.filter.runtimeMinutes.from, this.state.filter.runtimeMinutes.to]}
                        min={0}
                        max={400}
                        step={20}
                        marks={[
                            {
                                value: 0,
                                label: '0'
                            },
                            {
                                value: 60,
                                label: '60'
                            },
                            {
                                value: 120,
                                label: '120'
                            },
                            {
                                value: 240,
                                label: '240'
                            },
                            {
                                value: 400,
                                label: '400'
                            }
                        ]}
                        onChange={(event, newValue) => {
                            let tempFilter = this.state.filter;
                            tempFilter.runtimeMinutes.from = newValue[0];
                            tempFilter.runtimeMinutes.to = newValue[1];
                            this.setState({filter: tempFilter});
                        }}
                        valueLabelDisplay="auto"
                        aira-labelledby="range-slider"
                    />
                </div>
                <div className="average-rating-filter filter-container">
                    <h5>Average Rating</h5>
                    <Slider 
                        value={[this.state.filter.averageRating.from, this.state.filter.averageRating.to]}
                        max={10}
                        step={0.1}
                        marks={[
                            {
                                value: 0.0,
                                label: '0.0'
                            },
                            {
                                value: 2.5,
                                label: '2.5'
                            },
                            {
                                value: 5.0,
                                label: '5.0'
                            },
                            {
                                value: 7.5,
                                label: '7.5'
                            },
                            {
                                value: 10.0,
                                label: '10.0'
                            }
                        ]}
                        onChange={(event, newValue) => {
                            let tempFilter = this.state.filter;
                            tempFilter.averageRating.from = newValue[0];
                            tempFilter.averageRating.to = newValue[1];
                            this.setState({filter: tempFilter});
                        }}
                        valueLabelDisplay="auto"
                        aira-labelledby="range-slider"
                    />
                </div>
                <div className="num-votes-filter filter-container">
                    <h5>Minimum Vote Count</h5>
                    <Slider
                        min={0}
                        max={100000}
                        step={1000}
                        marks={[
                            {
                                value: 0,
                                label: '0'
                            },
                            {
                                value: 10000,
                                label: '10K'
                            },
                            {
                                value: 20000,
                                label: '20K'
                            },
                            {
                                value: 50000,
                                label: '50K'
                            },
                            {
                                value: 75000,
                                label: '75K'
                            },
                            {
                                value: 100000,
                                label: '100K+'
                            },
                        ]}
                        onChange={(event, newValue) => {
                            let tempFilter = this.state.filter;
                            tempFilter.numVotes = newValue;
                            this.setState({filter: tempFilter});
                        }}
                        defaultValue={50}
                        valueLabelDisplay="auto"
                        aira-labelledby="discrete-slider"
                    />
                </div>
                <div className="title-includes-filter filter-container">
                    <h5>Title Includes </h5>
                    <input type="text" value={(this.state.filter.titleIncludes == null)?'':this.state.filter.titleIncludes} onChange={
                        (event) => {
                            let tempFilter = this.state.filter;
                            tempFilter.titleIncludes = event.target.value;
                            this.setState({filter: tempFilter});
                        }
                    } />
                </div>
                <div className="num-movies-filter filter-container">
                    <h5>Number Of Movies Shown</h5>
                    {this.state.numMoviesButtons.map((numMovies, index) => 
                        <button className="buttons" style={{backgroundColor:this.state.numMoviesButtons[index].bgColor}} key={index} onClick={() => this.numMoviesOnClick(index)}>
                            {numMovies.name}
                        </button>
                    )}
                </div>
                <div style={{textAlign: "center"}}>
                    <button className="submit" onClick={() => this.filterOnClick()}>Search</button>
                </div>
            </div>
        )
    }
}
