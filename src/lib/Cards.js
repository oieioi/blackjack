import _ from 'lodash';

const SUITS = [
  'h',
  'c',
  'd',
  's',
];

const shuffled = () => {
  const raw_cards = SUITS.map((suit)=>{
    const cards = [];
    for(let i = 1; i <= 13; i++){
      cards.push({suit: suit, number: i})
    }
    return cards;
  }).reduce((memo, cs)=> {
    cs.forEach(c => memo.push(c));
    return memo;
  },[]);

  return _.shuffle(raw_cards);
}

export default {shuffled}
