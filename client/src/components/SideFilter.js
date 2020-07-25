import React, { Component } from 'react'
import './SideFilter.scss'

export default class SideFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trendingButtons: [
                {name: "Weekly", bgColor: "white", time_window: "week"},
                {name: "Daily", bgColor: "white", time_window: "day"}
            ],
            activeTrendingIndex: 0,
            genreButtons: [
                {name: "Action"},
                {name: "Adventure"}
            ]
        }
    }

    trendingOnClick(index) {
        let temp = this.state.trendingButtons;
        console.log(index);

        //Setting bgColor of button
        if(!index) {
            temp[index].bgColor = "orange";
            temp[index+1].bgColor = "white";
        }else {
            temp[index].bgColor = "orange";
            temp[index-1].bgColor = "white";
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
                <div className="filter-container">
                    <h5>Trending</h5>
                    <div className="filter-buttons">
                        {this.state.trendingButtons.map((trendingList, index) => 
                            <div className="buttons" style={{backgroundColor:this.state.trendingButtons[index].bgColor}} key={index} onClick={() => this.trendingOnClick(index)}>
                                {trendingList.name}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
