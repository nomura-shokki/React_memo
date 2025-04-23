// Reactのライブラリをインポート
// Reactコンポーネントの作成に使用
import React, { Component } from 'react';
// Reduxのconnect関数をインポート
// Reduxストアとコンポーネントを接続するために使用
import { connect } from 'react-redux';
// Reduxアクションをインポート
// メモを削除するためのアクションを作成する関数
import { deleteMemo } from './Store';

// ------------------------------------------
// DelFormコンポーネントの定義
// ------------------------------------------
// メモを削除するフォームを提供するためのコンポーネント
class DelForm extends Component {
  // インラインスタイルの定義（入力フィールドのデザイン）
  input = {
    fontSize: "12pt", // フォントサイズ
    color: "#006", // テキストカラー（青色）
    padding: "1px", // 内側余白
    margin: "5px 0px" // 上下に5pxの余白
  };

  // インラインスタイルの定義（ボタンのデザイン）
  btn = {
    fontSize: "10pt", // フォントサイズ
    color: "#006", // テキストカラー（青色）
    padding: "2px 10px" // 内側余白（上下2px、左右10px）
  };

  // コンストラクタ：クラスコンポーネントの初期化
  constructor(props) {
    super(props); // 親クラス（Component）のコンストラクタを呼び出し初期化
    // コンポーネントの内部状態を初期化
    this.state = {
      number: 0 // 削除対象のメモ番号を保持
    };

    // メソッドのバインド
    this.doChange = this.doChange.bind(this); // 入力フィールドの変更イベント処理
    this.doAction = this.doAction.bind(this); // フォーム送信イベント処理
  }

  // ------------------------------------------
  // 入力フィールドの変更イベントを処理
  // ------------------------------------------
  doChange(e) {
    // 入力フィールドの値を取得して、内部状態（number）を更新
    this.setState({
      number: e.target.value
    });
  }

  // ------------------------------------------
  // フォーム送信イベントを処理
  // ------------------------------------------
  doAction(e) {
    e.preventDefault(); // デフォルトのフォーム送信動作（ページリロード）を防ぐ
    let action = deleteMemo(this.state.number); // 削除アクションを作成
    this.props.dispatch(action); // Reduxストアにアクションをディスパッチ（送信）
    this.setState({
      number: 0 // フォーム送信後、入力フィールドをリセット
    });
  }

  // ------------------------------------------
  // UIのレンダリング処理
  // ------------------------------------------
  render() {
    let n = 0; // メモのインデックスカウンタ
    // メモデータをマップして、選択肢（<option>）を生成
    let items = this.props.data.map((value) => (
      <option key={n} value={n++}>
        {/* メッセージの先頭10文字を表示 */}
        {value.message.substring(0, 10)}
      </option>
    ));

    return (
      <div>
        {/* フォーム全体 */}
        <form onSubmit={this.doAction}>
          {/* メモを選択するドロップダウンリスト */}
          <select
            onChange={this.doChange} // 選択変更時にdoChangeメソッドが呼ばれる
            defaultValue="-1" // 初期選択値（未選択状態）
            style={this.input} // インラインスタイルを適用
          >
            {items} {/* 生成された選択肢を挿入 */}
          </select>

          {/* フォーム送信ボタン */}
          <input
            type="submit" // ボタンのタイプ（フォーム送信）
            style={this.btn} // インラインスタイルを適用
            value="Del" // ボタンに表示されるテキスト
          />
        </form>
      </div>
    );
  }
}

// Reduxストアと接続
// ストアの全ての状態（state）をpropsとして渡す設定
export default connect((state) => state)(DelForm);
