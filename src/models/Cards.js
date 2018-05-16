import Card from './Card';
import _ from 'lodash';

// 山札
export default class Cards {

  forEach(iterator) {
    this.cards.forEach(iterator)
  }

  map(iterator){
    return this.cards.map(iterator);
  }

  constructor(){
    // スート
    this.suits = [
      'h',
      'c',
      'd',
      's',
    ];

    const raw_cards = this.suits.map((suit)=>{
      const cards = [];
      for(let i = 1; i <= 13; i++){
        cards.push({suit: suit, number: i})
      }
      return cards;
    }).reduce((memo, cs)=> {
      cs.forEach(c => memo.push(c));
      return memo;
    },[]);

    // 山札
    this.cards = raw_cards.map(c => new Card(c.suit, c.number))

    // 捨て札
    this.trash_cards = [];

    this.shuffle();
  }

  // カードを切る
  shuffle() {
    this.cards = _.shuffle(this.cards);

    return this.cards;
  }

  // カードを一枚引く
  tap() {
    const card = this.cards.shift();
    this.cards.push(card);
    return card;
  }
}
