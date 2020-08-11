import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

export default class AddMovie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value:''
    }
    this.sendSearch = this.sendSearch.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  sendSearch(evt)
  {
    evt.preventDefault();
    if(this.state.value !== undefined)
    {
      //POST HERE
    }
  }

  updateSearch(evt){
    this.setState({value: evt.target.value});
  }

  render() {
    return this.props.isLoggedIn ? (
      <div>
        <h1>Add movie to your list:</h1>
        <form  noValidate autoComplete="off" onSubmit={this.sendSearch}>
          <TextField id="standard-basic" label="Search.." onChange={this.updateSearch}/>
          <IconButton aria-label="submit" type="submit">
            <SearchIcon />
          </IconButton>
        </form>
      </div>
    ) : <Redirect to="/login" />
  }
}
