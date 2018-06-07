import _ from 'lodash';

const SUITS = [
  'h',
  'c',
  'd',
  's',
];

// @public
// @return [Array] シャッフルしたカードオブジェクトの配列
const shuffled = () => {
  const raw_cards = SUITS.map((suit)=>{
    const cards = [];
    for(let i = 1; i <= 13; i++){
      cards.push({suit: suit, rank: i, closed: true})
    }
    return cards;
  }).reduce((memo, cs)=> {
    cs.forEach(c => memo.push(c));
    return memo;
  },[]);

  return _.shuffle(raw_cards);
}

// (破壊的に)山札からカードをめくり、手札に追加する
// @public
// @params stock [Array] 山札
// @params hand [Array] 手札
// @params open [Boolean] 手札を場にopenにするか
// @params destructive [Boolean] 受け取った山札と手札を破壊するか
// @return [Object] hand, stock stockから一枚引き、handに一枚加えた配列
const hit = (stock, hand, open, destructive = true) => {
  const hitted = _.sample(stock);
  const newStock = _.reject(stock, c => _.isEqual(hitted, c))
  const newHand = hand.concat(hitted);

  hitted.closed = !open

  if (destructive) {
    hand.push(hitted);
    const index = stock.findIndex( c => _.isEqual(c, hitted));
    stock.splice(index, 1);
  }

  return {stock: newStock, hand: newHand}
}

// @public
// @params hand [Array] 手札
// @return [Number] ブラックジャックのポイント
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

// @public
// @params [Array] hand 手札
// @return [Boolean] ディーラーが手札を引くか否か
const shouldHit = (hand) => calcPoint(hand) < 17;

const bursted = (hand) => calcPoint(hand) > 21;


// @public
// @params [Array] playerCards プレイヤーの手札
// @params [Array] dealerCards ディーラーの手札
// @return [String] win, lose, draw
const getResult = (playerCards, dealerCards) => {
    const dealerPoint = calcPoint(dealerCards);
    const playerPoint = calcPoint(playerCards);

    // ブタ
    if (bursted(playerCards)) return 'lose'
    if (bursted(dealerCards)) return 'win'

    // 引き分けてない
    if (dealerPoint > playerPoint) return 'lose'
    if (dealerPoint < playerPoint) return 'win'

    // 以下はpointが引き分けてる場合
    // BJ以外の引き分けはドロー
    if (dealerPoint !== 21)  return 'draw'

    // プレイヤーがナチュラルBJ
    if (playerCards.length === 2 && dealerCards.length !== 2) return 'win'

    // ディーラーがナチュラルBJ
    if (playerCards.length !== 2 && dealerCards.length === 2) return 'lose'

    // ディーラーとプレイヤーがナチュラルBJ
    return 'draw';
}

export default {shuffled, hit, shouldHit, calcPoint, bursted, getResult}
