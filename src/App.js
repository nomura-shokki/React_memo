// Reactのライブラリをインポート
import React, { Component } from 'react';
// Reduxのconnect関数をインポート。この関数を使用してReactコンポーネントをReduxストアと接続する
import { connect } from 'react-redux';
// アプリケーションのスタイルシートをインポート。`App.css` ファイル内に定義されたスタイルが適用される
import './App.css';
// 他のコンポーネントをインポート。このファイル内でそれらのコンポーネントを組み合わせて使う
import Memo from './memo/Memo'; // メモのリスト表示用コンポーネント
import AddForm from './memo/AddForm'; // メモを追加するフォーム
import FindForm from './memo/FindForm'; // メモ検索用のフォーム
import DelForm from './memo/DelForm'; // メモ削除用のフォーム

// ------------------------------------------
// アプリケーションのメインコンポーネントを定義
// ------------------------------------------
class App extends Component {
  // スタイル用のプロパティ
  // `td` はテーブルセルの幅を定義しており、250pxで固定される
  td = {
    width:"250px"
  }

  // コンストラクタ（`constructor`）はコンポーネントの初期化を行うメソッド
  constructor(props){
    super(props); // 親クラス（Component）のコンストラクタを呼び出し、`props` を初期化
  }

  // renderメソッド：ReactコンポーネントのUIを定義する
  render() {
    return (
      <div>
        {/* アプリケーションのタイトル */}
        <h1>Memo</h1>

        {/* メモを追加するためのフォームコンポーネント */}
        <AddForm />

        {/* 水平線を表示してセクションを区切る */}
        <hr />

        {/* 検索と削除フォームを配置するテーブル */}
        <table>
          <tbody>
            <tr>
              {/* 検索フォーム。`td` スタイルを適用 */}
              <td style={this.td}><FindForm /></td>
              {/* 削除フォーム。`td` スタイルを適用 */}
              <td style={this.td}><DelForm /></td>
            </tr>
          </tbody>
        </table>

        {/* メモ一覧を表示するコンポーネント */}
        <Memo />
      </div>
    );
  }
}

// connect関数を使用してAppコンポーネントをReduxストアと接続する
// 現在、ストアからの状態やアクションをマッピングしていないため、`connect()` のみが使用されている
export default connect()(App);

