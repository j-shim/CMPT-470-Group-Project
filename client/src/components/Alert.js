import React, { Component } from 'react'

export default class Alert extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let component

    if (this.props.alerts.message === '') {
      component = (<div></div>)
    } else {
      if (this.props.alerts.isSuccess) {
        component = (
          <div className="alert alert-success alert-dismissible fade show">
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
            {this.props.alerts.message}
          </div>
        )
      } else {
        component = (
          <div className="alert alert-danger alert-dismissible fade show">
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
            {this.props.alerts.message}
          </div>
        )
      }
    }

    return (
      <div className="container">
        <div className="col-md-6 offset-md-3">
          {component}
        </div>
      </div>
    )
  }
}
