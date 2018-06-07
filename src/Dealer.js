import React, { Component } from 'react';
import Cards from './Cards';
import Blackjack from './lib/Blackjack';

export default class Dealer extends Component {

  render() {
    return (
      <div className="">
        <h3>Dealer</h3>
        <div className="player--score">score: {Blackjack.calcPoint(this.props.cards)}</div>
        <Cards cards={this.props.cards} />
      </div>
    );
  }
}

