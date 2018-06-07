import React, { Component } from 'react';
import Cards from './Cards';
import Blackjack from './lib/Blackjack';
import './Dealer.css'

export default class Dealer extends Component {

  render() {
    const hasClosedCards = this.props.cards.filter(c => c.closed).length !== 0;
    return (
      <div className="dealer">
        <h3>Dealer</h3>
        <div className="dealer__score">score: {hasClosedCards ? '?' : Blackjack.calcPoint(this.props.cards)}</div>
        <Cards cards={this.props.cards} />
      </div>
    );
  }
}

