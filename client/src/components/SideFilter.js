import React, { Component } from 'react'
import { AccordionActions } from '@material-ui/core';

export default class SideFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trendingButtons: [
                {name: "Daily", isPressed: false },
                {name: "Weekly", isPressed: false }
            ]
        }
    }

    onClick(index) {
        let temp = this.state.trendingButtons;
        temp[index].isPressed = !temp[index].isPressed;
        this.setState({trendingButtons: temp});
    }

    render() {
        return (
            <div>
                {this.state.trendingButtons.map((genre, index) => 
                    <div key={index} onClick={() => this.onClick(index)}>
                        name: {genre.name}
                    </div>
                )}
            </div>
        )
    }
}
