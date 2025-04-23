// ReduxのcreateStore関数をインポート
// これにより、アプリケーションの状態（State）を一元管理するストアを作成できる
import { createStore } from 'redux';

// ------------------------------------------
// 初期状態 (initData)
// ------------------------------------------
// アプリケーションの初期状態を定義
const initData = {
  // メモデータの配列。初期データとして1つのサンプルデータが入っている
  data: [{ 
    message: 'sample data', // メモのメッセージ内容
    created: new Date() // 作成日時
  }],
  message: 'please type message:', // メッセージ表示用の文字列（ユーザーへの指示など）
  mode: 'default', // 現在のモード（"default", "find", "delete" などの切り替え）
  fdata: [] // 検索結果のデータ（"find" モードで使用）
};

// ------------------------------------------
// レデューサー関数 (memoReducer)
// ------------------------------------------
// アクションに応じて状態を更新する
// 第一引数：現在の状態 (state)、第二引数：アクション (action)
export function memoReducer(state = initData, action) {
  switch (action.type) {
    // "ADD" アクション：新しいメモを追加
    case 'ADD':
      return addReduce(state, action);

    // "DELETE" アクション：指定されたメモを削除
    case 'DELETE':
      return deleteReduce(state, action);

    // "FIND" アクション：メモを検索
    case 'FIND':
      return findReduce(state, action);

    // それ以外のアクション：状態を変更せず、現状維持
    default:
      return state;
  }
}

// ------------------------------------------
// 各アクションに対応した処理（レデュースアクション）
// ------------------------------------------

// メモ追加の処理
function addReduce(state, action) {
  // 新しいメモオブジェクトを作成
  let data = {
    message: action.message, // 新しいメモのメッセージ
    created: new Date() // 作成日時を現在時刻に設定
  };
  // 既存のメモ配列をコピーして新しいメモを追加（非破壊的に状態を更新）
  let newdata = state.data.slice(); // 元のデータをコピー
  newdata.unshift(data); // 配列の先頭に新しいメモを挿入
  // 更新された状態を返す
  return {
    data: newdata, // 更新されたメモ配列
    message: 'Added!', // ユーザーへの通知メッセージ
    mode: 'default', // モードは "default" にリセット
    fdata: [] // 検索結果をリセット
  };
}

// メモ検索の処理
function findReduce(state, action) {
  let f = action.find; // 検索文字列を取得
  let fdata = []; // 検索結果を格納する配列
  // メモの配列を順にチェックし、検索文字列が含まれるメモを検索結果に追加
  state.data.forEach((value) => {
    if (value.message.indexOf(f) >= 0) { // メッセージ内に検索文字列があるか確認
      fdata.push(value); // 該当するメモを結果に追加
    }
  });
  // 更新された状態を返す
  return {
    data: state.data, // メモデータは変更しない
    message: 'find "' + f + '":', // ユーザーへの検索結果メッセージ
    mode: 'find', // モードを "find" に変更
    fdata: fdata // 検索結果をセット
  };
}

// メモ削除の処理
function deleteReduce(state, action) {
  let newdata = state.data.slice(); // 元のデータをコピー
  newdata.splice(action.index, 1); // 指定されたインデックスのメモを削除
  // 更新された状態を返す
  return {
    data: newdata, // 更新されたメモ配列
    message: 'delete "' + action.index + '":', // ユーザーへの通知メッセージ
    mode: 'delete', // モードを "delete" に変更
    fdata: [] // 検索結果をリセット
  };
}

// ------------------------------------------
// アクションクリエーター
// ------------------------------------------
// アクションオブジェクトを生成する関数
// Reduxでは、アクションをディスパッチ（送信）する際にオブジェクト形式が必要

// メモ追加アクション
export function addMemo(text) {
  return {
    type: 'ADD', // アクションタイプ（"ADD"）
    message: text // 新しいメモのメッセージ
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
// レデューサー関数をもとにストアを作成する
// このストアをアプリケーション全体に提供し、状態管理を一元化する
export default createStore(memoReducer);
