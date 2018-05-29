import React, { Component } from 'react';
import Cards from './Cards';

export default class Dealer extends Component {

  render() {
    return (
      <div className="">
        <h3>Delaer{this.props.id}</h3>
        <Cards cards={this.props.cards} />
      </div>
    );
  }
}

