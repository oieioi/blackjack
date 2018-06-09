import React, { Component } from 'react';
import './Card.css'

export default class Card extends Component {

  render() {
      const cardBody = <div className="card__content card__content--opened">
        <div className="card__content-item">
          {this.suit(this.props.suit)}
          {this.rank(this.props.rank)}
        </div>
        <div className="card__content-item card__content-item--reversed">
          {this.suit(this.props.suit)}
          {this.rank(this.props.rank)}
        </div>
      </div>
      const content = this.props.closed ? <div className="card__content card__content--closed">&nbsp;</div> : cardBody;
    return (
      <li className="card">{content}</li>
    );
  }

  suit(suitStr) {
    const suits = {
      d: "♦",
      s: "♠",
      h: "♥",
      c: "♣"
    };

    return <span className={`card__suit card__suit--${suitStr}`}>{suits[suitStr]}</span>;
  }

  rank(number) {
    const ranks = [
      null,
      'A',
      '2', '3', '4', '5', '6', '7', '8', '9', '10',
      'J', 'Q', 'K'
    ]

    return <span className="card__rank">{ranks[number]}</span>;
  }
}

