import React, { Component } from 'react';
import ResultItem from './ResultItem';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          result: 'win',
          date: '2018-05-16T18:44:00',
          dealers:[
            {suit: 'h', number: 1},
            {suit: 'c', number: 3},
            {suit: 's', number: 2},
            {suit: 'd', number: 1},
          ],
          yours: [
            {suit: 'h', number: 1},
            {suit: 'c', number: 3},
            {suit: 's', number: 2},
            {suit: 'd', number: 1},
         ]
        },
      ]
    };
  }

  add(){
    alert('not implemented');
  }

  render() {
    const items = this.state.items.map((item, i) => <ResultItem
      name={item.name}
      result={item.result}
      date={item.date}
      yours={item.yours}
      dealers={item.dealers}
      key={i}
    />)
    return (
      <div className="results">
        <h2>Results</h2>
        <ul>{items}</ul>
      </div>
    );
  }
}
