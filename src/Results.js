import React, { Component } from 'react';
import Result from './Result';
import Summary from './Summary';
import './Results.css';

export default class Results extends Component {

  constructor(props) {
    super(props)
    this.state = {
      shouldShowAllResults: false
    };
  }

  render() {
      const results = this.props.results.map(r => <Result
        key={r.id}
        battle={r}
      />)

      return (
        <div className="results">
          <div className="results__summary">
            <Summary results={this.props.results} />
          </div>
          <div className="results__all">
            <button onClick={this.toggleShowAllResults.bind(this)}>{ this.state.shouldShowAllResults ? 'hide' : 'show' } all</button>
            <ul className="results__all-list"> { this.state.shouldShowAllResults ? results : ''} </ul>
          </div>
        </div>
      );
  }

  toggleShowAllResults(){
    const shouldShowAllResults = !this.state.shouldShowAllResults;
    this.setState(Object.assign(this.state, {shouldShowAllResults}))
  }
}

