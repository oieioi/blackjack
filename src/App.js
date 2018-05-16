import React, { Component } from 'react';
import Results from './Results';
import Battle from './Battle';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Battle />
        <Results />
      </div>
    );
  }
}

export default App;
