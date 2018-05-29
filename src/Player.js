import React, { Component } from 'react';
import Cards from './Cards';

export default class Player extends Component {

  render() {
    return (
      <div className="">
        <h3>Player{this.props.id}</h3>
        <Cards cards={this.props.cards} />
        <button onClick={this.props.hit}>hit </button>
        <button onClick={this.props.stand}>stand </button>
      </div>
    );
  }
}

