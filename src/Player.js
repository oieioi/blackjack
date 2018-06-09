import React, { Component } from 'react';
import Cards from './Cards';
import Blackjack from './lib/Blackjack';
import './Player.css'

export default class Player extends Component {

  render() {
    const doing = this.props.doing && this.props.result == null && this.props.action !== 'stand';
    return (
      <div className="player">
        <h3 className="player__name">You</h3>
        <div className="player__state">
          {this.getState(this.props.result, this.props.cards)}
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

  getState(result, cards) {
    const score = <span className="player__state-score">score: {Blackjack.calcPoint(cards)}</span>
    let emotion = '🤔';
    let message = 'Hit or Stand';

    if (result === 'win')  {emotion = '😎'; message = 'You Won!';}
    if (result === 'lose') {emotion = '😱'; message = 'You Lost';}
    if (result === 'draw') {emotion = '😐'; message = 'You Drew';}

    return <div className={`player__state-result player__state-result--${result}`}>
      <span aria-label="emoticon" role="img">{emotion}</span>
      {score} {message}
    </div>;
  }
}

