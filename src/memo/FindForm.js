// Reactのライブラリをインポート
// Reactを使ってクラスコンポーネントを作成するため
import React, { Component } from 'react';
// Reduxのconnect関数をインポート
// Reduxストアとコンポーネントを接続するために使用
import { connect } from 'react-redux';
// ReduxのfindMemoアクションをインポート
// 検索操作を実行するために使用されるアクション生成関数
import { findMemo } from './Store';

// ------------------------------------------
// FindFormコンポーネントの定義
// ------------------------------------------
// ユーザーがキーワードを入力してメモを検索するフォームを提供
class FindForm extends Component {
  // 入力フィールドのインラインスタイル
  input = {
    fontSize: "14pt", // フォントサイズ
    color: "#006", // テキストの色（濃い青）
    padding: "0px", // 内側余白なし
  };

  // ボタンのインラインスタイル
  btn = {
    fontSize: "12pt", // フォントサイズ
    color: "#006", // テキストの色（濃い青）
    padding: "1px 10px", // 上下1px、左右10pxの内側余白
  };

  // ------------------------------------------
  // コンストラクタ（コンポーネントの初期化）
  // ------------------------------------------
  constructor(props) {
    super(props); // 親クラス（Component）の初期化
    // コンポーネントの内部状態（state）を初期化
    this.state = {
      find: '' // 検索キーワードを保持
    };

    // メソッドのthisバインド（doChangeとdoActionのthisを現在のコンポーネントに固定）
    this.doChange = this.doChange.bind(this);
    this.doAction = this.doAction.bind(this);
  }

  // ------------------------------------------
  // 入力フィールドの変更イベント処理
  // ------------------------------------------
  doChange(e) {
    // 入力された値を取得し、stateのfindプロパティを更新
    this.setState({
      find: e.target.value // ユーザーが入力した値
    });
  }

  // ------------------------------------------
  // フォームの送信イベント処理
  // ------------------------------------------
  doAction(e) {
    e.preventDefault(); // デフォルトのフォーム送信動作（ページのリロード）を防止
    let action = findMemo(this.state.find); // 検索キーワードに基づいてfindMemoアクションを生成
    this.props.dispatch(action); // Reduxストアにアクションをディスパッチ（送信）
  }

  // ------------------------------------------
  // UIの描画処理
  // ------------------------------------------
  render() {
    return (
      <form onSubmit={this.doAction}> {/* フォームの送信時にdoActionが呼び出される */}
        {/* テキスト入力フィールド */}
        <input
          type="text" // 入力フィールドのタイプ
          size="10" // 入力フィールドの幅（10文字分）
          onChange={this.doChange} // 入力内容が変更されるたびにdoChangeを呼び出す
          style={this.input} // 入力フィールドに適用するインラインスタイル
          value={this.state.find} // 入力フィールドの値をstateのfindプロパティにバインド
        />
        {/* 送信ボタン */}
        <input
          type="submit" // ボタンのタイプ（フォーム送信）
          style={this.btn} // ボタンに適用するインラインスタイル
          value="Find" // ボタンに表示されるテキスト
        />
      </form>
    );
  }
}

// ------------------------------------------
// Reduxのconnect関数を使用してストアと接続
// ------------------------------------------
// ストアの状態（state）をFindFormコンポーネントのpropsとして渡す
export default connect((state) => state)(FindForm);
