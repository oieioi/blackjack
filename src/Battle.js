import React, { Component } from 'react';
import Cards from './models/Cards';

export default class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 山札
      cards: null,
      dealers: [
        {suit: "h", number: "1"}
      ],
      yours: [
        {suit: "c", number: "1"}
      ]
    };
  }

  // 勝負を開始する
  start(){
    const cards = new Cards();
    console.log(cards);
    // カードを2枚づつ引く
    this.setState(Object.assign(this.state, {cards: cards}));
  }

  // カードを引く
  hit(){
    alert('you will hit!');
    // 自身のカードに追加
    alert('I will hit!');
  }


  // 勝負する
  stand(){
  }


  render() {
    const dealerCards = this.state.dealers.map((card)=> <li>{card.suit}:{card.number}</li>)
    const yourCards = this.state.yours.map((card)=> <li>{card.suit}:{card.number}</li>)
    return (
      <div className="battle">
        <h2>Black Jack Battle</h2>
        <div className="dealer_hands">
          dealer hands:<ul>{dealerCards}</ul>
        </div>
        <div className="your_hands">
          your hands:<ul>{yourCards}</ul>
        </div>
        <h3>operation</h3>
        <button onClick={this.start.bind(this)}>start!!</button>
        <button onClick={this.hit.bind(this)}>Hit!!</button>
        <button onClick={this.stand.bind(this)}>Stand!!</button>
      </div>
    );
  }
}
