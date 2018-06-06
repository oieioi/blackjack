import React, { Component } from 'react';

export default class Card extends Component {

  render() {
    return (
      <li className="card" key={this.props.suit + '-' + this.props.rank}>
        <div className="card-suit">{this.props.suit}</div>
        <div className="card-rank">{this.props.rank}</div>
      </li>
    );
  }
}

