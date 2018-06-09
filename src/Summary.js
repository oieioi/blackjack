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

    const summaries = keys.map(key => {
      const score = playersScore[key];
      const all = score.win + score.lose + score.draw;
      const rate = score.win / all
      return <li
        className="summary__item"
        key={key}
      >
          <div className="summary__item-rate">
            player {key}: {rate.toFixed(3)}
          </div>
          <ul className="summary__item-detail">
            <li>win: {playersScore[key].win}</li>
            <li>lose: {playersScore[key].lose}</li>
            <li>draw: {playersScore[key].draw}</li>
            <li>yet: {playersScore[key].noGame}</li>
          </ul>
        </li>
    })
    return <div className="summary">
      <h2 className="summary__rate">Rate</h2>
      <ul className="summary__list">{summaries}</ul>
    </div>
  }
}

