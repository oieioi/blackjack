# Reactの練習でブラックジャックを作ってみる会

## start

npm install
npm start


## 設計

以下のようなWeb APIを想定する

- POST /battles
    - リクエスト player 数
    - {untrashed, dealer, players, state, id}
        - turn 手番
        - untrashed 山札
            - suit(heart, club, spade, diamond)
            - rank(A2345678910jqk)
        - dealer ディーラーの手札
            - cards
                - suit
                - rank
                - opened bool
        - players プレーヤーたち
            - action 現在のターンで何をするか
                - hit or stand or null
            - result
                - null or won or lose
            - cards
                - suit
                - rank
        - state 勝負の状態
            - doing
            - done
- POST /battles/:id/players/:p_id/action
    - ヒットを行う
    - スタンドを行う
        - ターンが進んでもそれ以上カードを引かない。
    - プレーヤーが全員意思を表示すると以下を行う。
        - 全員スタンドかつディーラーの数字が18以上だったら勝負を行う。
        - それ以外の場合
            - ヒットのプレイヤーにカードを一枚配る
            - ディーラーの数字が17以下だったら自身にカードを配る

めんどそうなのでプレーヤー一人として考えよう
