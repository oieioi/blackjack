import CardUtil from './CardUtil';

// Web APIのダミーっぽい感じで

// @public
// battleを作成
const create = async () => {
    const count = Number(localStorage.getItem('count') || 0);
    localStorage.setItem('count', count + 1);
    let stock = CardUtil.shuffled();
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
        const news = CardUtil.hit(stock, p.cards);
        stock = news.stock;
        p.cards = news.hand;

        const news2 = CardUtil.hit(stock, p.cards);
        stock = news2.stock;
        p.cards = news2.hand;
    });

    const news = CardUtil.hit(stock, dealer.cards);
    stock = news.stock;
    dealer.cards = news.hand;

    const news2 = CardUtil.hit(stock, dealer.cards);
    stock = news2.stock;
    dealer.cards = news2.hand;

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
    const news = CardUtil.hit(battle.untrashed, player.cards);
    battle.untrashed = news.stock;
    player.cards = news.hand;

    if (CardUtil.calcPoint(player.cards) > 21) {
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

    if(!shouldEnd(battleId)) {
        return new Promise(resolve => resolve(battle));
    }


    // ターン終了処理
    const battleResult = await dealerAction(battleId);
    const dealerPoint = CardUtil.calcPoint(battleResult.dealer.cards);

    // FIXME: 勝利判定
    battleResult.players.forEach((p) => {
        const playerPoint = CardUtil.calcPoint(p.cards);

        if      (playerPoint > 21) p.result = 'lose'
        else if (dealerPoint > 21) p.result = 'win'
        else if (dealerPoint >= playerPoint) p.result = 'lose'
        else p.result = 'win'
    });

    localStorage.setItem(battleId, JSON.stringify(battleResult));
    return new Promise(resolve => resolve(battleResult));

}

// @private
// 全員スタンドしたか
const shouldEnd = async (battleId) => {
    let battle = await get(battleId);
    return battle.players.filter(p => p.state === 'stand').length === battle.players.length;
}

// @private
// ディーラーがカードを引く
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
