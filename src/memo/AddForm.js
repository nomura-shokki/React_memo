// Reactのライブラリをインポート
// Reactを使用してUIコンポーネントを作成するため
import React, { Component } from 'react';
// Reduxのconnect関数をインポート
// connect関数を使ってコンポーネントをReduxストアと接続できる
import { connect } from 'react-redux';
// Reduxのアクション作成関数（addMemo）をインポート
// この関数を呼び出して新しいメモを追加するアクションを生成する
import { addMemo } from './Store';

// ------------------------------------------
// AddFormコンポーネントの定義
// ------------------------------------------
// メモを追加するためのフォームUIを提供するコンポーネント
class AddForm extends Component {
  // インラインスタイルを設定（入力フィールドのデザイン）
  input = {
    fontSize: "16pt", // フォントサイズ
    color: "#006", // テキストカラー（濃い青色）
    padding: "1px", // 内側余白
    margin: "5px 0px" // 上下に5pxの余白
  };

  // インラインスタイルを設定（送信ボタンのデザイン）
  btn = {
    fontSize: "14pt", // フォントサイズ
    color: "#006", // テキストカラー（濃い青色）
    padding: "2px 10px" // 内側余白（上下2px、左右10px）
  };

  // コンストラクタ（クラスの初期化メソッド）
  constructor(props) {
    super(props); // 親クラス（Component）のコンストラクタを呼び出して初期化
    // コンポーネントの内部状態（state）を初期化
    this.state = {
      message: '' // メッセージ入力フィールドの初期値
    };

    // メソッドのバインド（thisを正しく参照できるようにする）
    this.doChange = this.doChange.bind(this); // 入力内容の変更時に呼び出されるメソッド
    this.doAction = this.doAction.bind(this); // フォーム送信時に呼び出されるメソッド
  }

  // ------------------------------------------
  // 入力フィールドの変更イベントを処理
  // ------------------------------------------
  doChange(e) {
    // 入力フィールドの値（e.target.value）を取得し、コンポーネントのstateを更新
    this.setState({
      message: e.target.value // 入力されたメッセージをstateに格納
    });
  }

  // ------------------------------------------
  // フォーム送信イベントを処理
  // ------------------------------------------
  doAction(e) {
    e.preventDefault(); // デフォルトのフォーム送信動作（ページリロード）を防ぐ
    let action = addMemo(this.state.message); // Reduxのアクション作成関数を呼び出し、新しいメモを作成
    this.props.dispatch(action); // Reduxストアにアクションをディスパッチ（送信）して状態を更新
    this.setState({
      message: '' // フォーム送信後、入力フィールドを空にする
    });
  }

  // ------------------------------------------
  // UIのレンダリング処理
  // ------------------------------------------
  render() {
    return (
      <div>
        {/* Reduxストアから渡されたメッセージを表示 */}
        <p style={this.message}>{this.props.message}</p>
        {/* メモを追加するためのフォーム */}
        <form onSubmit={this.doAction}> {/* フォーム送信時にdoActionメソッドが呼ばれる */}
          <input
            type="text"
            size="40" // 入力フィールドのサイズ（40文字分の幅）
            onChange={this.doChange} // 入力内容変更時にdoChangeメソッドが呼ばれる
            style={this.input} // 入力フィールドにインラインスタイルを適用
            value={this.state.message} // stateのmessageを入力フィールドにバインド
            required // 必須入力フィールド
          />
          <input
            type="submit" // フォーム送信ボタン
            style={this.btn} // ボタンにインラインスタイルを適用
            value="Add" // ボタンのテキスト
          />
        </form>
      </div>
    );
  }
}

// ------------------------------------------
// Reduxのconnect関数を使用してストアと接続
// ------------------------------------------
// ストアの全ての状態（state）をpropsとしてAddFormコンポーネントに渡す
export default connect((state) => state)(AddForm);
