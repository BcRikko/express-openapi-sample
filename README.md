express-openapi-sample
====

ExpressのOpen API(旧Swagger)フレームワークを使って、Todoアプリをつくる

## 使い方

Node.jsはとりあずv6.0以上
* node.js >= v6.0

### Install
```sh
$ npm install
```

### Build
```sh
$ npm run build
```

### Test
```sh
$ npm run test
```


## メモ

### Open APIについて

RESTful APIのインターフェイスを記述するフォーマット。
express-oepnapiでは、`paths`部分を空にしてしまうので、オリジナルは[api_original.yml](./api_original.yml)を参照。

* [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md)
* [express-openapi](https://github.com/kogosoftwarellc/express-openapi)


### APIのパスについて

APIのベースパスは、[api.yml#L2](./api.yml#L2)部分で定義する。
ここで指定した`basePath`が`http://example.com/{basePath}/`のようになる。
`api`だったり`1.0`のようなAPIバージョンを書くことが多い。

エンドポイントは、`src/api`以下でファイル名やディレクトリ名がそのままパスになる。


### ディレクトリについて

```
.src
├── index.ts               // expressを起動させるためのコード
├── Server.ts              // コア部分
├── api.ts                 // レスポンス処理の共通処理
├── api                    // APIパス（この配下がエンドポイントになっていく）
│   ├── tasks              // basePath/tasks/...
│   │   └── {id}.ts        // basePath/tasks/{id}
│   └── tasks.ts           // basePath/tasks
├── models
│   ├── Task.ts            // Taskテーブルの定義
│   └── TaskController.ts  // Taskテーブルを操作する
└── store
    └── index.ts           // データベースの設定
```

### バリデーションについて

`src/api`で定義されている`apiDoc`により、pathやbodyパラメータのバリデーションが行われる。


