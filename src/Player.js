import React, { Component } from 'react';
import Cards from './Cards';
import CardUtil from './lib/CardUtil';

export default class Player extends Component {

  render() {
    return (
      <div className="player">
        <h3>Player:{this.props.id}</h3>
        <div className="player--score">score: {CardUtil.calcPoint(this.props.cards)}</div>
        <Cards cards={this.props.cards} />
        <button onClick={this.props.hit}>hit</button>
        <button onClick={this.props.stand}>stand</button>
      </div>
    );
  }
}

