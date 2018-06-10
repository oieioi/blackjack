import React, { Component } from 'react';
import BattleAPI from './lib/BattleAPI';
import Player from './Player';
import Dealer from './Dealer';
import './Button.css'
import './Battle.css';

export default class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brainCount: 1,
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
    this.props.changed();
    this.setState(battle)
  }

  // カードを引く
  async hit(playerId){
    const battle = await BattleAPI.hit(this.state.id, playerId);
    this.props.changed();
    this.setState(battle);
  }


  // 勝負する
  async stand(playerId){
    const battle = await BattleAPI.stand(this.state.id, playerId);
    this.props.changed();
    this.setState(battle);
  }

  async componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress.bind(this), false)
    await this.start();
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
    const brains = new Array(this.state.brainCount).fill('🧠').join('')
    return (
      <div className="battle">
        <h2>
          <span
            role="img"
            aria-label="help"
            style={{cursor: 'pointer'}}
            onClick={this.help.bind(this)}
          >🐙</span>
          <span className="battle__title">Blackjack</span>
          <span
            role="img"
            aria-label="brain"
            style={{cursor: 'pointer'}}
            onClick={this.addBrain.bind(this)}>{brains}</span>
        </h2>
        <button
          className="battle__start-button btn btn--long"
          onClick={this.start.bind(this)}
          disabled={this.state.state === 'doing'}
        >Restart Battle<span role="img" aria-label="launch"></span></button>
        <Dealer cards={this.state.dealer.cards} />
        {players}
      </div>
    );
  }

  addBrain(){
    this.setState(Object.assign(this.state, {brainCount: this.state.brainCount + 1}))
  }

  // TODO: キーボードショートカット
  // どこに書くべきなんだろう？
  async handleKeyPress(e) {
    // j, h
    if (e.keyCode === 74|| e.keyCode === 72) {
      if (this.state.state === 'doing') {
        // TODO: playerId対応
        this.hit(0);
      } else {
        this.start();
      }
    }

    // k, s
    if (e.keyCode === 75|| e.keyCode === 83) {
      this.stand(0);
    }
  }

  help() {
    alert(`
      hit: "h" or "j"
      stand: "k" or "s"
      restart: "h" or "j" (only if the game is over)
      `);
  }
}
