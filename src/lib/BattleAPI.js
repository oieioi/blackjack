import CardUtil from './CardUtil';

// Web APIのダミーっぽい感じで

// @public
// battleを作成
const create = async () => {
    const count = Number(localStorage.getItem('count') || 0);
    localStorage.setItem('count', count + 1);

    const battle = {
        id: count,
        turn: 0,
        untrashed: CardUtil.shuffled(),
        dealer: {
            cards: [],
        },
        players: [
            {
                id: 0,
                cards: [],
                action: null,
                result: null,
            }
        ],
        state: 'doing',
    }

    localStorage.setItem(count, JSON.stringify(battle));

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
    const news = CardUtil.hit(battle.untrashed, player.cards);
    battle.untrashed = news.stock;
    player.cards = news.hand;

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

    // ターン終了処理
    if(shouldEnd(battleId)) {
        return dealerAction(battleId);
    } else {
      return new Promise(resolve => resolve(battle));
    }
}

// @private
// 全員スタンドしたか
const shouldEnd = async (battleId) => {
    let battle = await get(battleId);
    return battle.players.filter(p => p.state === 'stand').length === battle.players.length;
}

const dealerAction = async (battleId) => {
    let battle = await get(battleId);

    while(CardUtil.burst(battle.dealer.cards)) {
        const news = CardUtil.hit(battle.untrashed, battle.dealer.cards);
        battle.untrashed = news.stock;
        battle.dealer.cards = news.hand;
    }

    localStorage.setItem(battleId, JSON.stringify(battle));
    return new Promise(resolve => resolve(battle));
}

export default {create, get, hit, stand}
