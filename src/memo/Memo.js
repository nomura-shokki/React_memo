// Reactの基盤となるライブラリをインポート
// Reactコンポーネントを作成するために使用
import React, { Component } from 'react';
// Reduxのconnect関数をインポート
// この関数を使ってReactコンポーネントをReduxストアと接続できる
import { connect } from 'react-redux';

// Itemコンポーネントをインポート
// Memoコンポーネント内で個別のデータを表示するために使用
import Item from './Item';

// ------------------------------------------
// Memoコンポーネントを定義
// ------------------------------------------
class Memo extends Component {

  // renderメソッド: ReactコンポーネントのUIを描画する
  render(){
    // data変数の初期化（レンダリングするデータを保持）
    let data;
    // インデックスカウンターnの初期化（各データに一意のインデックスを割り振る）
    let n = 0;

    // props.modeの値によって異なる処理を実行
    // modeは「default」「find」「delete」など、現在の操作モードを示すプロパティ
    switch (this.props.mode){

      // modeが"default"の場合: すべてのデータを表示
      case 'default':
      data = this.props.data.map((value)=>(
        // Itemコンポーネントにデータを渡し、一意のkeyを割り当て
        <Item key={value.message} value={value} index={n++} />
      ));
      break;

      // modeが"find"の場合: 検索結果（fdata）を表示
      case 'find':
      data = this.props.fdata.map((value)=>(
        <Item key={value.message} value={value} index={n++}/>
      ));
      break;

      // modeが"delete"の場合: すべてのデータを表示（削除後の状態）
      case 'delete':
      data = this.props.data.map((value)=>(
        <Item key={value.message} value={value} index={n++} />
      ));
      break;

      // modeが指定されていない場合（またはそれ以外の場合）
      default:
      data = this.props.data.map((value)=>(
        <Item key={value.message} value={value} index={n++} />
      ));
    }

    // 最終的に生成されたdataをテーブル形式で表示
    return (
      <table>
        <tbody>
          {/* テーブルの中に各データを含むItemコンポーネントを配置 */}
          {data}
        </tbody>
      </table>
    );
  }
}

// Reduxのconnect関数を使用してMemoコンポーネントをストアと接続
// (state)=>stateは、Reduxの全ての状態をpropsとして渡す設定
export default connect((state) => state)(Memo);
