import React, { Component } from 'react';
import BattleAPI from './lib/BattleAPI';
import Player from './Player';
import Dealer from './Dealer';

export default class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      turn: 0,
      untrashed: [],
      dealer: {
        cards: [],
      },
      players: [
        {
          id: 0,
          cards: [],
          action: null,
          result: null,
        }
      ],
      state: 'yet',
    };
  }

  // 勝負を開始する
  async start(){
    const battle = await BattleAPI.create();
    this.setState(battle)
  }

  // カードを引く
  async hit(playerId){
    const battle = await BattleAPI.hit(this.state.id, playerId);
    this.setState(battle);
  }


  // 勝負する
  async stand(playerId){
    const battle = await BattleAPI.stand(this.state.id, playerId);
    this.setState(battle);
  }


  render() {
    const players = this.state.players.map(p => <Player
      id={p.id}
      cards={p.cards}
      action={p.action}
      result={p.result}
      hit={ ()=> this.hit(p.id) }
      stand={ ()=>this.stand(p.id) }
      key={p.id}
      doing={this.state.state === 'doing'}
    />)
    return (
      <div className="battle">
        <h2>Blackjack !</h2>
        <button onClick={this.start.bind(this)}>start battle!!</button>
        <div className="battle-cards"> battleID : {this.state.id} </div>
        <Dealer cards={this.state.dealer.cards} />
        {players}
      </div>
    );
  }
}
