import React, { Component } from 'react';
import Cards from './models/Cards';
//import Dealer from './models/Dealer';
//import Player from './models/Player';
//import BattleModel from './models/Battle';
import CardView from './Card';

export default class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      battle: {},
      cards: [],
      dealer: [],
      player: [],
    };
  }

  // 勝負を開始する
  start(){
    const cards = new Cards(this.state.cards);
    this.setState(Object.assign(this.state, {cards: cards.toJSON()}))
  }

  // カードを引く
  hit(){
  }


  // 勝負する
  stand(){
  }


  render() {
    const cards       = this.state.cards.map((card, i)=> <CardView card={card}/>)
    const dealerCards = this.state.dealer.map((card, i)=> <CardView card={card}/>)
    const yourCards   = this.state.player.map((card, i)=> <CardView card={card}/>)
    return (
      <div className="battle">
        <h2>Black Jack Battle</h2>
        <div className="battle-cards">
          deck: {this.state.cards.length}
          <ul>{cards}</ul>
        </div>
        <div className="dealer_hands">
          dealer: {this.state.dealer.length}
          <ul>{dealerCards}</ul>
        </div>
        <div className="your_hands">
          player: {this.state.player.length}
          <ul>{yourCards}</ul>
        </div>
        <h3>operation</h3>
        <button onClick={this.start.bind(this)}>start!!</button>
        <button onClick={this.hit.bind(this)}>Hit!!</button>
        <button onClick={this.stand.bind(this)}>Stand!!</button>
      </div>
    );
  }
}
