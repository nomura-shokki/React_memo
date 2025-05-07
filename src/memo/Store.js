// ReduxのcreateStore関数をインポート
// Reduxのストアを作成するための関数です。
// ストアは状態（State）を保持し、状態を管理する中心的なオブジェクトです。
import { createStore } from 'redux';

// ------------------------------------------
// 初期状態 (initData)
// ------------------------------------------
// Reduxストアで管理する状態の初期値を定義します。
// このオブジェクトは、アプリケーションを初期化した際のデフォルトの状態として利用されます。
const initData = {
  data:[], // メモのリスト（現在のメモを保持します。空配列で初期化）
  message:'please type message:', // 画面に表示するメッセージ（初期メッセージ）
  mode:'default', // アプリのモード（デフォルト状態を示す）
  fdata:[] // 検索結果として表示するメモ（空配列で初期化）
};

// ------------------------------------------
// レデューサー関数 (memoReducer)
// ------------------------------------------
// 状態更新の処理を担う関数です。
// アクション（typeとデータを持つオブジェクト）を受け取り、状態を更新します。
export function memoReducer(state = initData, action) {
  // Reduxでは現在の状態（state）と発生したアクション（action）が引数として渡されます。
  switch (action.type) {
    // ------------------------------------------
    // "ADD" アクション：新しいメモを追加
    case 'ADD':
      // メモを追加する処理に移行します。
      return addReduce(state, action);

    // ------------------------------------------
    // "DELETE" アクション：指定されたメモを削除
    case 'DELETE':
      // メモを削除する処理に移行します。
      return deleteReduce(state, action);

    // ------------------------------------------
    // "FIND" アクション：メモを検索
    case 'FIND':
      // メモを検索する処理に移行します。
      return findReduce(state, action);

    // ------------------------------------------
    // その他のアクション：状態をそのまま返す
    default:
      // 特定のアクションタイプがマッチしない場合、現在の状態をそのまま返します。
      return state;
  }
}

// ------------------------------------------
// 各アクションに対する処理（レデュースアクション）
// ------------------------------------------
// アクションタイプに応じた状態更新ロジックを定義します。

// メモ追加の処理（"ADD" アクション）
function addReduce(state, action) {
  let d = new Date(); // 現在の日時
  let f = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); // 作成日時フォーマット（HH:MM:SS）

  // 新しいメモオブジェクトを作成
  let data = {
    message: action.message, // アクションから渡されたメッセージを使用
    created: f // 作成日時をセット
  };

  // 既存のメモをコピーし、先頭に新しいメモを追加
  let newdata = state.data.slice(); // 配列のコピーを作成
  newdata.unshift(data); // 新しいメモを配列の先頭に追加

  // 更新された状態を返す
  return {
    data: newdata, // 更新された全メモデータ
    message: 'Added!', // ユーザーへの通知メッセージ
    mode: 'default', // デフォルトモードに戻す
    fdata: [] // 検索結果はリセット
  };
}

// メモ検索の処理（"FIND" アクション）
function findReduce(state, action) {
  let f = action.find; // 検索する文字列をアクションから取得
  let fdata = []; // 検索結果を格納する配列

  // 全メモの配列を実行し、検索文字を含むメモを結果に追加
  state.data.forEach((value) => {
    if (value.message.indexOf(f) >= 0) { // メッセージ内に検索文字列があるか確認
      fdata.push(value); // 該当するメモを検索結果に追加
    }
  });

  // 更新された状態を返す
  return {
    data: state.data, // 全メモデータは変更しない
    message: 'find "' + f + '":', // ユーザーへの検索結果メッセージ
    mode: 'find', // "find" モードに設定
    fdata: fdata // 検索結果をセット
  };
}

// メモ削除の処理（"DELETE" アクション）
function deleteReduce(state, action) {
  let newdata = state.data.slice(); // 配列のコピーを作成
  newdata.splice(action.index, 1); // 指定されたインデックスのメモを削除

  // 更新された状態を返す
  return {
    data: newdata, // 更新されたメモ配列
    message: 'delete "' + action.index + '":', // ユーザーへの通知メッセージ
    mode: 'delete', // "delete" モードに設定
    fdata: [] // 検索結果はリセット
  };
}

// ------------------------------------------
// アクションクリエーター
// ------------------------------------------
// アプリケーション内で必要なアクションオブジェクトを生成する関数を提供します。
// これにより、アクションオブジェクトを簡単に作成できます。

// メモ追加アクション
export function addMemo(text) {
  return {
    type: 'ADD', // アクションタイプ（"ADD"）
    message: text // 新しいメモのメッセージをセット
  };
}

// メモ削除アクション
export function deleteMemo(num) {
  return {
    type: 'DELETE', // アクションタイプ（"DELETE"）
    index: num // 削除するメモのインデックス番号
  };
}

// メモ検索アクション
export function findMemo(text) {
  return {
    type: 'FIND', // アクションタイプ（"FIND"）
    find: text // 検索する文字列
  };
}

// ------------------------------------------
// Reduxストアの作成
// ------------------------------------------
// レデューサー関数を渡してストアを作成します。
// 作成したストアはアプリ全体で利用され、状態管理の中心的な役割を果たします。
export default createStore(memoReducer);
