// 山札
export default class Card {

  suit_master(){
    return {
      'h': 'heart',
      'c': 'club',
      's': 'spade',
      'd': 'diamond',
    };
  }

  constructor(suit, number){
    this.raw_suit = suit;
    this.number = Number(number);
    this.opened = false;
  }

  // カードを開く
  open() {
    this.opened = true;
  }

  rank() {
    switch(this.number){
      case 1: return 'A';
      case 11: return 'J';
      case 12: return 'Q';
      case 13: return 'K';
      default: return this.number;
    }
  }

  suit() {
    return this.suit_master()[this.raw_suit];
  }

  to_s() {
    return `${this.suit()}: ${this.rank()}`
  }
}
