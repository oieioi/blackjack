import React, { Component } from 'react';

export default class Result extends Component {

  render() {
    const players = this.props.battle.players.map(p =>
      <li key={p.id} className="result__player">
        {p.id}: {p.result}
      </li>
    )
    return (
      <li className="result">
        battle {this.props.battle.id}:
        <ul className="result__players">{players}</ul>
      </li>
    );
  }
}

