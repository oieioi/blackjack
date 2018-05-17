import React, { Component } from 'react';
import CardModel from './models/Card';

export default class Card extends Component {

  render() {
    const card = new CardModel(this.props.card);
    return (
      <li class="card" key={card.suit() + '-' + card.rank()}>
        <div class="card-suit">{card.suit()}</div>
        <div class="card-rank">{card.rank()}</div>
      </li>
    );
  }
}

