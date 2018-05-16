import React, { Component } from 'react';

export default class ResultItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li>
        <div className="name"> name: {this.props.name} </div>
        <div className="result"> result: {this.props.result} </div>
        <div className="date"> {this.props.date} </div>
      </li>
    );
  }
}

