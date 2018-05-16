// 山札
export default class Cards {
  constructor(){
    // スート
    this.suits = [
      'h',
      'c',
      'd',
      's',
    ];

    this.cards = this.suits.map((suit)=>{
      const cards = [];
      for(let i = 1; i <= 13; i++){
        cards.push({suit: suit, number: i})
      }
      return cards;
    }).reduce((memo, cs)=> {
      cs.forEach(c => memo.push(c));
      return memo
    },[]);

    this.shuffle();
  }

  // カードを切る
  shuffle() {
  }

  // カードを一枚引く
  tap() {
  }
}
