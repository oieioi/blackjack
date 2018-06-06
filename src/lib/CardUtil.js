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
      cards.push({suit: suit, rank: i})
    }
    return cards;
  }).reduce((memo, cs)=> {
    cs.forEach(c => memo.push(c));
    return memo;
  },[]);

  return _.shuffle(raw_cards);
}

const hit = (stock, hand) => {
  const hitted = _.sample(stock);
  const newStock = _.reject(stock, c => _.isEqual(hitted, c))
  const newHand = hand.concat(hitted);
  
  return {stock: newStock, hand: newHand}
}

const calcPoint = (hand) => {
  if (hand.length === 0) return 0;

  // Aを除いた点数
  const basePoint = hand.reduce((memo, card) => {
    if (card.rank === 1){
      return memo;
    } else if ([11,12,13].includes(card.rank)){
      return memo + 10;
    } else {
      return memo + card.rank;
    }
  }, 0);

  // Aの数
  const aceCount = hand.filter((card)=> card.rank === 1).length;

  // Aのとりうるポイント
  // [1,1,1,1,11,11,11,11].combination(4).to_a.uniq.map{|items| items.reduce(0){|s,m| s+m}}
  const acePoints = [
    // Aなし
    [0],
    // A
    [1, 11],
    // A A
    [2, 12, 22],
    // A A A
    [3, 13, 23, 33],
    // A A A A
    [4, 14, 24, 34, 44]
  ][aceCount];

  // 全体の取りうるポイント
  const possibles = acePoints.map(p => p + basePoint);

  // 全体の取りうるポイントのうちまだバストしてない
  const ok = possibles.filter(p => p <= 21);
  if (ok.length === 0) {
    return _.min(possibles);
  } else {
    return _.max(ok);
  }
}

const burst = (hand) => {
  const point = calcPoint(hand);

  return point < 17;
}

export default {shuffled, hit, burst, calcPoint}
