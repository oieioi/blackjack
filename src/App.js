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
      </div>
    );
  }
}

export default App;
