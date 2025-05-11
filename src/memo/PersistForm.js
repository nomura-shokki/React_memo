import React, { Component } from 'react'; // ReactのComponentクラスをインポート
import { connect } from 'react-redux'; // Reduxのconnect関数をインポート（ReactコンポーネントとReduxストアを接続）
import pstore from '../index'; // Reduxのストアをインポート

// PersistForm クラスコンポーネントの定義
class PersistForm extends Component {
  // チェックボックスのスタイルオブジェクト
  check = {
    margin: "5px 0px" // チェックボックスの上下マージンを設定
  };

  // ラベルのスタイルオブジェクト
  label = {
    fontSize: "12pt", // フォントサイズを指定
    color: "#006", // ラベルの色を紺色に設定
    padding: "2px 10px" // ラベルのパディング（内側余白）を設定
  };

  // コンストラクタ：コンポーネントの初期状態を定義
  constructor(props) {
    super(props);
    this.state = {
      check: 'on', // チェックボックスの状態を 'on'（チェックされた状態）で初期化
    };
    
    // イベントハンドラ（doChange）を `this` にバインド
    this.doChange = this.doChange.bind(this);
  }

  // チェックボックス変更時の処理
  doChange(e) {
    let f = e.target.checked; // チェックボックスの状態を取得（true or false）
    
    this.setState({
      check: f ? 'on' : '' // チェックの状態を更新（on → チェックあり、'' → チェックなし）
    });

    if (f) {
      // チェックされた場合、データの永続化を実行
      pstore.persist(); // Redux-Persistの永続化を実行
      pstore.flush();   // すぐに保存するように指示
    } else {
      // チェックが外された場合、一時的に永続化を停止
      pstore.pause(); // Redux-Persistの永続化を一時停止
    }
  }

  // コンポーネントの描画処理
  render() {
    return (
      <div>
        {/* ラベルでチェックボックスを包み、見た目を整える */}
        <label style={this.label}>
          {/* チェックボックス */}
          <input 
            type="checkbox" // チェックボックス型
            id="check" // IDを設定
            size="40" // サイズを設定（ただし、type="checkbox" では size 属性は機能しない）
            onChange={this.doChange} // チェック状態が変わったら doChange 関数を実行
            style={this.check} // スタイルを適用
            checked={this.state.check} // チェックの状態を state に基づいて制御
          />
          Persist {/* チェックボックスの右側にテキストを表示 */}
        </label>
      </div>
    );
  }
}

// ReduxのstateをReactコンポーネントに接続
export default connect((state) => state)(PersistForm);