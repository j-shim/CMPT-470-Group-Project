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
            numVotes: 1000,
            //DROP DOWN FOR NUM OF MOVIES
        }
    }

    isAdultOnClick() {
        let temp = this.state.isAdultButton;

        //Setting bgColor of button
        if(temp.bgColor === "orange") {
            temp.bgColor = "white";
        }else if (temp.bgColor === "white") {
            temp.bgColor = "orange";
        }

        this.setState({isAdultButtons: temp});
    }

    genreOnClick(index) {
        let temp = this.state.genreButtons;

        //Setting bgColor of button
        if(temp[index].bgColor === "orange") {
            temp[index].bgColor = "white";
        }else if (temp[index].bgColor === "white") {
            temp[index].bgColor = "orange";
        }

        this.setState({genreButtons: temp});
    }

    trendingOnClick(index) {
        let temp = this.state.trendingButtons;
        console.log(index);

        //Setting bgColor of button
        if(temp[index].bgColor === "orange") {
            temp[index].bgColor = "white";
        }else if (temp[index].bgColor === "white") {
            temp[index].bgColor = "orange";
        }

        this.props.setActiveTrending(temp[index].time_window);
        this.setState({trendingButtons: temp});
        this.setState({activeTrendingIndex: index});
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
                        value={[this.state.startAfter, this.state.endBefore]}
                        min={1900}
                        max={2020}
                        step={10}
                        onChange={(event, newValue) => {
                            let startAfter = this.state.startAfter;
                            let endBefore = this.state.endBefore;
                            startAfter = newValue[0];
                            endBefore = newValue[1];
                            this.setState({startAfter: startAfter});
                            this.setState({endBefore: endBefore});
                        }}
                        valueLabelDisplay="auto"
                        aira-labelledby="range-slider"
                    />
                </div>
                <div className="runtime-filter filter-container">
                    <h5>Runtime</h5>
                    <Slider 
                        value={[this.state.runtimeMinutes.from, this.state.runtimeMinutes.to]}
                        min={40}
                        max={400}
                        step={20}
                        onChange={(event, newValue) => {
                            let temp = this.state.runtimeMinutes;
                            temp.from = newValue[0];
                            temp.to = newValue[1];
                            this.setState({runtimeMinutes: temp});
                        }}
                        valueLabelDisplay="auto"
                        aira-labelledby="range-slider"
                    />
                </div>
                <div className="average-rating-filter filter-container">
                    <h5>Average Rating</h5>
                    <Slider 
                        value={[this.state.averageRating.from, this.state.averageRating.to]}
                        max={10}
                        onChange={(event, newValue) => {
                            let temp = this.state.averageRating;
                            temp.from = newValue[0];
                            temp.to = newValue[1];
                            this.setState({averageRating: temp});
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
