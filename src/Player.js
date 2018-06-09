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
    let emotion = '🤔';
    let message = 'Hit or Stand';

    if (result === 'win')  {emotion = '😎'; message = 'You Won!';}
    if (result === 'lose') {emotion = '😱'; message = 'You Lost';}
    if (result === 'draw') {emotion = '😐'; message = 'You Drew';}

    return <div className="player__result player__result--yet"> <span aria-label="emoticon" role="img">{emotion}</span>{score} {message}</div>;
  }
}

