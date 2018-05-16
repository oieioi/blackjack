import React, { Component } from 'react';
import Cards from './models/Cards';
import Dealer from './models/Dealer';
import Player from './models/Player';
import BattleModel from './models/Battle';

export default class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      battle: new BattleModel(),
      cards: new Cards(),
      dealer: new Dealer(),
      player: new Player()
    };
  }

  // 勝負を開始する
  start(){
    const cards = new Cards();
    const dealer = new Dealer();
    const player = new Player();
    const battle = new BattleModel({cards, dealer, player});

    this.setState(Object.assign(this.state, {cards, dealer, player, battle}));
  }

  // カードを引く
  hit(){
    const battle = new BattleModel(this.state.battle);
    battle.hit();
    this.setState(Object.assign(this.state, {battle}));
  }


  // 勝負する
  stand(){
    const battle = new BattleModel(this.state.battle);
    battle.stand();
    this.setState(Object.assign(this.state, {battle}));
  }


  render() {
    const cards = this.state.cards.map((card, i)=> <li key={i}>{card.to_s()}</li>)
    const dealerCards = this.state.dealer.cards.map((card, i)=> <li key={i}>{card.suit}:{card.number}</li>)
    const yourCards = this.state.player.cards.map((card, i)=> <li key={i}>{card.suit}:{card.number}</li>)
    return (
      <div className="battle">
        <h2>Black Jack Battle</h2>
        <div className="battle-cards">
          山札
          <ul>{cards}</ul>
        </div>
        <div className="dealer_hands">
          dealer hands:<ul>{dealerCards}</ul>
        </div>
        <div className="your_hands">
          player hands:<ul>{yourCards}</ul>
        </div>
        <h3>operation</h3>
        <button onClick={this.start.bind(this)}>start!!</button>
        <button onClick={this.hit.bind(this)}>Hit!!</button>
        <button onClick={this.stand.bind(this)}>Stand!!</button>
      </div>
    );
  }
}
