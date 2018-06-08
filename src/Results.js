import React, { Component } from 'react';
import Result from './Result';

export default class Results extends Component {

  render() {
      const results = this.props.results.map(r => <Result
        key={r.id}
        battle={r}
      />)
      return (
        <div className="results">
          <div className="results__summary">{this.summary(this.props.results)}</div>
          <ul className="results__list"> {results} </ul>
        </div>
      );
  }

  summary(results) {
    const playersScore = {};
    results.forEach( r => {
      r.players.forEach(p => {
        if (!playersScore[p.id]) playersScore[p.id] = {lose: 0, win: 0, draw: 0};
        playersScore[p.id][p.result]++;
      })
    })

    const keys = Object.keys(playersScore);
    return keys.map(key => {
      const score = playersScore[key];
      const all = score.win + score.lose + score.draw;
      const rate = score.win / all
      return <li className="reesults__summary-item" key={key}>
        player {key}の勝率 {rate.toFixed(3)}
        <ul>
          <li>win: {playersScore[key].win}</li>
          <li>lose: {playersScore[key].lose}</li>
          <li>draw: {playersScore[key].draw}</li>
        </ul>
      </li>
    })
  }
}

