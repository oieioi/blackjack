import React, { Component } from 'react';
import Card from './Card';

export default class Cards extends Component {

  render() {
      const cards = this.props.cards.map(c => <Card
          suit={c.suit}
          rank={c.rank}
          closed={c.closed}
          key={`${c.suit}-${c.rank}`}
      />)
      return (
        <ul className="cards"> {cards} </ul>
      );
  }
}

