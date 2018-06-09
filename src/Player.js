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
        {result}
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
        <div className="player__score">score: {Blackjack.calcPoint(this.props.cards)}</div>
        <Cards cards={this.props.cards} />
      </div>
    );
  }

  getResult(result) {

    if (result === 'win') return <div className="player__result player__result--win">You won 😎 </div>;

    if (result === 'lose') return <div className="player__result player__result--lose">You lose 😱 </div>;

    if (result === 'draw') return <div className="player__result player__result--draw">You draw 😐 </div>;

    return <div className="player__result player__result--yet">hit or stand 🤔</div>;
  }
}

