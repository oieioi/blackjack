import Blackjack from './Blackjack';

// Web APIのダミーっぽい感じで

// @public
// battleを作成
const create = async () => {
    const count = Number(localStorage.getItem('count') || 0);
    localStorage.setItem('count', count + 1);
    let stock = Blackjack.shuffled();
    let players = [
        {
            id: 0,
            cards: [],
            action: null,
            result: null,
        }
    ];

    let dealer = {
        cards: [],
    }

    // 初期カード配る
    // FIXME: 汚い
    players.forEach((p)=>{
        Blackjack.hit(stock, p.cards, true);
        Blackjack.hit(stock, p.cards, true);
    });

    Blackjack.hit(stock, dealer.cards, true);
    Blackjack.hit(stock, dealer.cards, false);

    const battle = {
        id: count,
        turn: 0,
        untrashed: stock,
        dealer: dealer,
        players: players,
        state: 'doing',
    }

    localStorage.setItem(battle.id, JSON.stringify(battle));

    return new Promise(resolve => resolve(battle));
};

// @private
// battle を取得
const get = async (battleId) => {
    const battle = localStorage.getItem(battleId);
    return new Promise(resolve => resolve(JSON.parse(battle)));
}


// @public
// カードを引く
const hit = async (battleId, playerId) => {
    let battle = await get(battleId);
    let player = battle.players.find(p => p.id === Number(playerId));

    // プレイヤーのカードをめくる
    Blackjack.hit(battle.untrashed, player.cards, true);

    if (Blackjack.bursted(player.cards)) {
        // まけ
        player.result = 'lose'
    }

    localStorage.setItem(battleId, JSON.stringify(battle));

    return new Promise(resolve => resolve(battle));
}

// @public
// カードを引かない
const stand = async (battleId, playerId) => {
    let battle = await get(battleId);
    let player = battle.players.find(p => p.id === Number(playerId));

    player.action = 'stand';

    localStorage.setItem(battleId, JSON.stringify(battle));

    if(! await shouldEnd(battleId)) {
        return new Promise(resolve => resolve(battle));
    }


    // ターン終了処理
    const battleResult = await dealerAction(battleId);
    const dealer = battleResult.dealer;

    // 勝利判定
    battleResult.players.forEach((player) => {
        player.result = Blackjack.getResult(player.cards, dealer.cards);
    });

    localStorage.setItem(battleId, JSON.stringify(battleResult));
    return new Promise(resolve => resolve(battleResult));
}

// @private
// 全員スタンドしたか
const shouldEnd = async (battleId) => {
    let battle = await get(battleId);
    return battle.players.filter(p => p.action === 'stand').length === battle.players.length;
}

// @private
// ディーラーがカードを引く
const dealerAction = async (battleId) => {
    let battle = await get(battleId);

    battle.dealer.cards.forEach(c => c.closed = false);

    while(Blackjack.shouldHit(battle.dealer.cards)) {
        Blackjack.hit(battle.untrashed, battle.dealer.cards, true);
    }

    localStorage.setItem(battleId, JSON.stringify(battle));
    return new Promise(resolve => resolve(battle));
}

const index = async () => {
    const max = Number(localStorage.getItem('count') || 0);
    let count = 0;
    const all = [];
    while (max > count) {
        const battle = await get(count);
        all.push(battle)
        count++;
    }
    return new Promise(resolve => resolve(all))
}

export default {create, index, get, hit, stand}

