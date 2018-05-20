# Reactの練習でブラックジャックを作ってみる会

See also https://qiita.com/hirossyi73/items/cf8648c31898216312e5

## start

npm install
npm start


## 設計

- Battle 試合
    - has one 山札
        - has many cards
    - has one Dealer
        - has many cards
        - カードを引く
    - has one Player
        - has many cards
    - 次は誰か？
- モデルはJSON表表現んだけでやる？
- プレイヤーはカード引くか、勝負をするかのみを選べる。
    - スタート
        - 山札を切る
        - 初期カードを配る
    - カードを引く
    - 勝負する

