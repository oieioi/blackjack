import React, { Component } from 'react';
import Cards from './Cards';
import Blackjack from './lib/Blackjack';

export default class Player extends Component {

  render() {
    const doing = this.props.doing && this.props.result == null;
    return (
      <div className="player">
        <h3>Player:{this.props.id}</h3>
        <div className="player--score">score: {Blackjack.calcPoint(this.props.cards)}</div>
        <div className="player--result">result: {this.props.result || 'doing'}</div>
        <Cards cards={this.props.cards} />
        <button onClick={this.props.hit} disabled={!doing}>hit</button>
        <button onClick={this.props.stand} disabled={!doing}>stand</button>
      </div>
    );
  }
}

