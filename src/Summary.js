import React, { Component } from 'react';

export default class Summary extends Component {

  render() {

    const playersScore = {};

    this.props.results.forEach( r => {
      r.players.forEach(p => {
        if (!playersScore[p.id]) playersScore[p.id] = {lose: 0, win: 0, draw: 0, noGame: 0};
        playersScore[p.id][p.result || 'noGame']++;
      })
    })

    const keys = Object.keys(playersScore);
    return keys.map(key => {
      const score = playersScore[key];
      const all = score.win + score.lose + score.draw + score.noGame;
      const rate = score.win / all
      return <li className="results__summary-item" key={key}>
        player {key}の勝率: {rate.toFixed(3)}
        <ul>
          <li>win: {playersScore[key].win}</li>
          <li>lose: {playersScore[key].lose}</li>
          <li>draw: {playersScore[key].draw}</li>
          <li>no game: {playersScore[key].noGame}</li>
        </ul>
      </li>
    })
  }
}

