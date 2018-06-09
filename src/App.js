import React, { Component } from 'react';
import BattleAPI from './lib/BattleAPI';
import Battle from './Battle';
import Results from './Results';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: []
    }
  }

  async componentDidMount() {
    await this.applyBattle();
  }

  async applyBattle(){
    const results = await BattleAPI.index();
    this.setState(Object.assign(this.state, {results}));
  }

  render() {
    return (
      <div className="app">
        <Battle changed={this.applyBattle.bind(this)} />
        <Results results={this.state.results}/>
        <a href="https://github.com/oieioi/blackjack">
          <img
            style={{position: 'fixed', bottom: 0, right: 0, border: 0, transform: 'rotate(180deg)'}}
            src="https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png"
            alt="Fork me on GitHub" />
          </a>
      </div>
    );
  }
}

export default App;
