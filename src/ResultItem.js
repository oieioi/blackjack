import React, { Component } from 'react';

export default class ResultItem extends Component {
  //constructor(props) {
  //  super(props);
  //}

  render() {
    const yours = this.props.yours.map((c, i) => <li key={i}>{c.suit}:{c.number}</li>)
    const dealers = this.props.dealers.map((c, i) => <li key={i}>{c.suit}:{c.number}</li>)
    return (
      <li>
        <div className="date"> {this.props.date} </div>
        <div className="result"> result: {this.props.result} </div>
        yours: <ul>{yours}</ul>
        dealers: <ul>{dealers}</ul>
      </li>
    );
  }
}

