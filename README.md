# プロジェクト名

都道府県の総人口推移グラフアプリ   
デモ版: <https://brillar2225.github.io/react-typescript-prefpop/>

## 概要

このアプリでは、日本の各都道府県における「総人口」「少年人口」「生産年齢人口」「老人人口」をグラフを通じて動的に確認できます。
<img alt="総人口推移グラフ画面" src="https://github.com/brillar2225/react-typescript-prefpop/assets/91242076/62fa4dab-0d32-4964-8169-b8ea6def003d" width="1024px">

今回のプロジェクトでは、確かに一人での作業ではありましたが、チーム開発のように**アプリの拡張性やコードの読みやすさに気をつけて作成**するようにしました。   
例えば、UIやロジックのコードを分離し、コードの可読性を高めるなど、それぞれのコンポーネントが持つ用途に合わせて構成しました。   
また、CSSの作業においても、UIライブラリーの使用が禁止されていたため、BEMを積極的に使用することで、classの規則性を保ちチーム開発にも対応するようにしました。

### 使用技術

+ React
+ TanStack Query
+ TypeScript
+ Recharts.js
+ axios
+ RESAS API
+ jest

### 利用方法

利用方法は、とても簡単です。
1. 上記の4個のカテゴリーからご希望の情報を押下してください。デフォルトは総人口ですので、押下しなくても構いません。
2. 気になる都道府県をチェックして当該都道府県の人口推移についてグラフを通じて確認してみてください。

### コマンドライン

> デベロップメントモードを開始します。
```sh
npm run start
```

> テストモードを開始します。
```sh
npm test
```

> コードをビルドしデプロイを開始します。
```sh
npm run deploy
```

### 改善したい点

この旅は、始めて使う技術が多かったため、私にとっては大きなチャレンジでした。   
しかし、その分得たものもたくさんあると考えました。   
とはいえ、改善したい点について少し述べさせていただきたいと思います。   
1. テストコードのみならず、jestの勉強を深めて今後のコード作成において、コードの安定性を高めたいです。引いては、TDDという方式に挑戦してみたいと考えました。この度は始めて使う技術が多かったことから、コードを先に書いてからテストコードを書きましたが、このような形でテストコードを書くと、どうしても自分のコードに合わせてテストコードを書くようになるので、安定性の高くリファクタリングしやすいコードになりにくいと感じました。
2. アプリのロジックをuseApiのカスタムフックに纏めて、内部の各ロジックが連携して動作するように開発してありますが、この点によりロジック間の依存性が高くなっていると考えました。故に、今後のリファクタリングを考慮し、それぞれの依存性を低める必要があると考えました。