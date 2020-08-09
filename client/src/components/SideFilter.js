import React, { Component } from 'react'
import Slider from '@material-ui/core/Slider'
import './SideFilter.scss'

export default class SideFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdultButton: {
                name: "Adult Movies", 
                bgColor: "white"
            },
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
                {name: "Science Fiction", bgColor: "white"},
                {name: "Thriller", bgColor: "white"},
                {name: "War", bgColor: "white"}
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
                averageRating: {
                    from: 0.0,
                    to: 10.0
                },
                numVotes: 300,
                titleIncludes: null,
                numMovies: 20
            }
        }
    }

    isAdultOnClick() {
        let temp = this.state.isAdultButton;
        let tempFilter = this.state.filter;

        //Setting bgColor of button
        if(temp.bgColor === "orange") {
            temp.bgColor = "white";
            tempFilter.isAdult = false;
        }else if (temp.bgColor === "white") {
            temp.bgColor = "orange";
            tempFilter.isAdult = true;
        }

        this.setState({isAdultButtons: temp});
        this.setState({filter: tempFilter});
        this.props.setFilter(this.state.filter);
    }

    genreOnClick(index) {
        let temp = this.state.genreButtons;
        let tempFilter = this.state.filter;

        //Setting bgColor of button
        if(temp[index].bgColor === "orange") {
            temp[index].bgColor = "white";
        }else if (temp[index].bgColor === "white") {
            temp[index].bgColor = "orange";
        }

        this.setState({genreButtons: temp});
        this.setState({filter: tempFilter});
        this.props.setFilter(this.state.filter);
    }

    render() {
        return (
            <div className="filter">
                <h2>Filters</h2>
                <hr/>
                <div className="isAdult-filter filter-container">
                    <h5>Adult</h5>
                    <button className="buttons" style={{backgroundColor:this.state.isAdultButton.bgColor}} onClick={() => this.isAdultOnClick()}>
                        {this.state.isAdultButton.name}
                    </button>
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
                        step={10}
                        onChange={(event, newValue) => {
                            let tempFilter = this.state.filter;
                            tempFilter.startAfter = newValue[0];
                            tempFilter.endBefore = newValue[1];
                            this.setState({filter: tempFilter});
                            this.props.setFilter(this.state.filter);
                        }}
                        valueLabelDisplay="auto"
                        aira-labelledby="range-slider"
                    />
                </div>
                <div className="runtime-filter filter-container">
                    <h5>Runtime</h5>
                    <Slider 
                        value={[this.state.filter.runtimeMinutes.from, this.state.filter.runtimeMinutes.to]}
                        min={40}
                        max={400}
                        step={20}
                        onChange={(event, newValue) => {
                            let tempFilter = this.state.filter;
                            tempFilter.runtimeMinutes.from = newValue[0];
                            tempFilter.runtimeMinutes.to = newValue[1];
                            this.setState({filter: tempFilter});
                            this.props.setFilter(this.state.filter);
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
                        onChange={(event, newValue) => {
                            let tempFilter = this.state.filter;
                            tempFilter.averageRating.from = newValue[0];
                            tempFilter.averageRating.to = newValue[1];
                            this.setState({filter: tempFilter});
                            this.props.setFilter(this.state.filter);
                        }}
                        valueLabelDisplay="auto"
                        aira-labelledby="range-slider"
                    />
                </div>
                <div className="num-votes-filter filter-container">
                    <h5>Number of Votes</h5>
                </div>
            </div>
        )
    }
}
