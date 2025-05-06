// Reactのライブラリをインポート
// Reactのクラスコンポーネントを使用してUIを作成するため
import React, { Component } from 'react';
// Reduxのconnect関数をインポート
// connect関数を使用してコンポーネントをReduxストアと接続可能にする
import { connect } from 'react-redux';

// ------------------------------------------
// Itemコンポーネントを定義
// ------------------------------------------
class Item extends Component {
  // テーブルヘッダー（<th>）のスタイル設定
  // メモ番号（No, X）を表示するために使用
  th = {
    fontSize: "14pt", // フォントサイズ
    backgroundColor: "blue", // 背景色
    color: "white", // テキストカラー
    padding: "5px 10px", // 内側余白（上下5px、左右10px）
    width: "50px" // 幅を固定（50px）
  };

  // テーブルデータセル（<td>）のスタイル設定
  // メモ本文を表示するために使用
  td = {
    fontSize: "14pt", // フォントサイズ
    backgroundColor: "white", // 背景色
    color: "darkblue", // テキストカラー
    padding: "5px 10px", // 内側余白（上下5px、左右10px）
    border: "1px solid lightblue", // 薄い青色の枠線（境界線）
    minWidth: "300px" // 幅の最小値を設定（300px以上を保証）
  };

  // テーブルデータセル（<td>）のスタイル設定
  // 作成日時を表示するために使用
  date = {
    fontSize: "14pt", // フォントサイズ
    backgroundColor: "white", // 背景色
    color: "darkblue", // テキストカラー
    padding: "5px 10px", // 内側余白（上下5px、左右10px）
    border: "1px solid lightblue", // 境界線
    width: "80px" // 幅を固定（80px）
  };

  // renderメソッド：ReactコンポーネントのUIを定義して描画

  render(){
    return (
    <tr><th style={this.th}>No, {this.props.index}</th>
      <td style={this.td}>{this.props.value.message}</td>
      <td style={this.date}>{this.props.value.created}</td>
    </tr>
    );
  }  
}

// Reduxのconnect関数を使用してItemコンポーネントを接続
// 現在のコードではストアの状態を使用しないため、単純にconnect()で包んでいる
export default connect()(Item);
