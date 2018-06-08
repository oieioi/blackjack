import React, { Component } from 'react';
import Cards from './Cards';
import Blackjack from './lib/Blackjack';
import './Player.css'

export default class Player extends Component {

  render() {
    const doing = this.props.doing && this.props.result == null && this.props.action !== 'stand';
    const result = this.getResult(this.props.result);
    return (
      <div className="player">
        <h3 className="player__name">You</h3>
        <div className="player__operations">
          <button
            className="player__operations-button player__operations-button--hit"
            onClick={this.props.hit}
            disabled={!doing}>Hit</button>
          <button
            className="player__operations-button player__operations-button--stand"
            onClick={this.props.stand}
            disabled={!doing}>Stand</button>
        </div>
        <div className="player__score">score: {Blackjack.calcPoint(this.props.cards)}</div>

        {result}
        <Cards cards={this.props.cards} />
      </div>
    );
  }

  getResult(result) {

    if (result === 'win') return <div className="player__result player__result--win">You win! </div>;

    if (result === 'lose') return <div className="player__result player__result--lose">You lose! </div>;

    if (result === 'draw') return <div className="player__result player__result--draw">You draw! </div>;

    return '';
  }
}

