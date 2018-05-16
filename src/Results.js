import React, { Component } from 'react';
import ResultItem from './ResultItem';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {name: 'a', result: 'win', date: '2018-05-16T18:44:00'},
        {name: 'b', result: 'lose', date: '2018-05-16T18:44:00'}
      ]
    };
  }

  add(){
    alert('not implemented');
  }

  render() {
    const items = this.state.items.map(item => <ResultItem
      name={item.name}
      result={item.result}
      date={item.date}
    />)
    return (
      <div className="results">
        <h2>Results</h2>
        <ul>{items}</ul>
      </div>
    );
  }
}
