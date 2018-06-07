import React, { Component } from 'react';
import Cards from './Cards';
import Blackjack from './lib/Blackjack';
import './Player.css'

export default class Player extends Component {

  render() {
    const doing = this.props.doing && this.props.result == null;
    const result = this.getResult(this.props.result);
    return (
      <div className="player">
        <h3 className="player__name">You</h3>
        <button onClick={this.props.hit} disabled={!doing}>hit</button>
        <button onClick={this.props.stand} disabled={!doing}>stand</button>
        <div className="player__score">score: {Blackjack.calcPoint(this.props.cards)}</div>
        {result}
        <Cards cards={this.props.cards} />
      </div>
    );
  }

  getResult(result) {

    if (result === 'win') return <div className="player__result player__result--win">You win! </div>;

    if (result === 'lose') return <div className="player__result player__result--lose">You lose! </div>;

    return '';
  }
}

