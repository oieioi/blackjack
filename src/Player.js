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
        <div className="player__state">
          {result}
        </div>
        <div className="player__operations">
          <button
            className="btn btn--next"
            onClick={this.props.hit}
            disabled={!doing}>Hit</button>
          <button
            className="btn btn--danger"
            onClick={this.props.stand}
            disabled={!doing}>Stand</button>
        </div>
        <Cards cards={this.props.cards} />
      </div>
    );
  }

  getResult(result) {
    const score = <span className="player__result-score">score: {Blackjack.calcPoint(this.props.cards)}</span>

    if (result === 'win') return <div className="player__result player__result--win">You won <span aria-label="you are cool" role="img">😎</span>{score}</div>;

    if (result === 'lose') return <div className="player__result player__result--lose">You lost <span aria-label="you feel bad" role="img">😱</span> {score}</div>;

    if (result === 'draw') return <div className="player__result player__result--draw">You drew <span aria-label="you feel nothing" role="img">😐</span> {score}</div>;

    return <div className="player__result player__result--yet">hit or stand <span aria-label="you are thinking" role="img">🤔</span>{score}</div>;
  }
}

