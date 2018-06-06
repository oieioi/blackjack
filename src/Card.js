import React, { Component } from 'react';

export default class Card extends Component {

  render() {
    return (
      <li className="card" key={this.props.suit + '-' + this.props.rank}>
        <span className="card-suit">{this.props.suit}</span>
        <span className="card-rank">{this.props.rank}</span>
      </li>
    );
  }
}

