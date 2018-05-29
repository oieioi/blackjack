import React, { Component } from 'react';
import CardModel from './models/Card';

export default class Card extends Component {

  render() {
    return (
      <li class="card" key={this.props.suit + '-' + this.props.number}>
        <div class="card-suit">{this.props.suit}</div>
        <div class="card-rank">{this.props.rank}</div>
      </li>
    );
  }
}

