import React, { Component } from 'react';
import Cards from './Cards';
import Blackjack from './lib/Blackjack';
import './Dealer.css'

export default class Dealer extends Component {

  render() {
    return (
      <div className="dealer">
        <h3 className="dealer__name">Dealer</h3>
        <div className="dealer__state">
          {this.getState(this.props.cards)}
        </div>
        <Cards cards={this.props.cards} />
      </div>
    );
  }

  getState(cards) {
    const hasClosedCards = cards.filter(c => c.closed).length !== 0;
    const score = hasClosedCards ? '???' : Blackjack.calcPoint(this.props.cards)
    const scoreEl = <span className="dealer__state-score">score: {score}</span>
    let emotion = '😼';
    let message = '';

    if (score > 21)  { emotion = '🙀'; message = 'Meow!'}

    return <div className="dealer___state-text"> <span aria-label="emoticon" role="img">{emotion}</span>{scoreEl} {message}</div>;
  }

}

