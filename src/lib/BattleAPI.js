import CardUtil from './CardUtil';

// Web APIのダミーっぽい感じで

// @public
// battleを作成
const create = async () => {
    const count = Number(localStorage.getItem('count') || 0);
    const nextCount = count + 1;
    localStorage.setItem('count', nextCount);

    const battle = {
        id: count + 1,
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

// @private
// ターンを終える
const turnEnd = async (battleId) => {
    let battle = await get(battleId);
    // プレイヤーたちのカードをめくる
    battle.players.forEach(p => {
        if (p.state === 'hit') {
            const news = CardUtil.hit(battle.untrashed, p.cards);
            battle.untrashed = news.stock;
            p.cards = news.hand;
        }
    })
    // ディーラーのカードをめくる
    const dealerNews = CardUtil.hit(battle.untrashed, battle.dealer.cards);
    battle.untrashed = dealerNews.stock;
    battle.dealer.cards = dealerNews.hand;

    // ターンをインクリメント
    battle.turn++;
    // 勝敗チェック
}

// @public
// カードを引く
const hit = async (battleId, playerId) => {
    return await setPlayerState(battleId, playerId, 'hit');
}

// @public
// カードを引かない
const stand = async (battleId, playerId) => {
    return await setPlayerState(battleId, playerId, 'stand');
}

// @private
const setPlayerState = async (battleId, playerId, state) => {
    let battle = await get(battleId);
    let player = battle.players.find(p => p.id === Number(playerId));
    player.action = state;

    localStorage.setItem(battleId, JSON.stringify(battle));

    // ターン終了処理
    if (turnEnd(battleId)) {
        battle.state = 'done';
    }

    return new Promise(resolve => resolve(battle));
}

export default {create, get, hit, stand}
