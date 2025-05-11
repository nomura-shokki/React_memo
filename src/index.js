import React from 'react'; // Reactのコアライブラリをインポート
import ReactDOM from 'react-dom/client'; // ReactのDOM操作用ライブラリをインポート
import { createStore } from 'redux'; // Reduxのストアを生成するための関数をインポート
import { Provider } from 'react-redux'; // ReactコンポーネントでReduxストアを共有するためのProviderをインポート
import { persistStore, persistReducer } from 'redux-persist'; // Redux Persistの関数をインポート
import storage from 'redux-persist/lib/storage'; // Redux Persistがデフォルトで使用するブラウザのストレージ（localStorage）をインポート
import { PersistGate } from 'redux-persist/integration/react'; // PersistGateコンポーネントにより、プロバイダー内でストア再復元が完全に実行されるまでUIを遅延させることを可能にする
import './index.css'; // CSSファイルをインポート（アプリのスタイリング用）
import App from './App'; // アプリケーションのメインコンポーネント
import MemoStore, { memoReducer } from './memo/Store'; // メモ管理用のReduxストアや対応するリデューサーをインポート

// Redux Persistの設定オブジェクト
// Redux Persistはステートを永続化するために使用されます。
// key: ストレージ内での永続化データのキー名
// storage: 使用するストレージ（ここではlocalStorageを使用）
const persistConfig = {
    key: 'memo',
    storage: storage,
    blacklist: ['message', 'mode', 'fdata'],
    whilelist: ['data']
};

// リデューサーを永続化するための関数（persistReducer）を使用して新しいリデューサー（persistedReducer）を作成
// この永続化リデューサーは状態をRedux Persistが管理するストレージと同期し、永続化を可能にします。
const persistedReducer = persistReducer(persistConfig, memoReducer);

// Reduxのストアを作成（createStore関数を使用）
// persistedReducerをストアのリデューサーとして設定します。
let store = createStore(persistedReducer);

// Redux Persistのパーシスターを作成
// persistStore関数は渡されたReduxストアに基づきパーシスターを生成します。
// パーシスターはストアの状態をブラウザのストレージ（例: localStorage）に保存・復元します。
let pstore = persistStore(store);

// ReactDOMを使ってReactアプリをブラウザにレンダリング
const root = ReactDOM.createRoot(document.getElementById('root')); // 'root'というIDのあるHTML要素にアタッチ
root.render(
    // ReduxのProviderでアプリケーションをラップすることで、アプリケーション全体でReduxストアを共有可能に
    <Provider store={store}>
        {/* PersistGateコンポーネントでアプリケーションをラップし、Redux Persistが状態を復元するまでローディング状態を表示 */}
        {/* loadingプロップには状態復元中に表示するUI（ここでは<p>loading...</p>を指定） */}
        <PersistGate loading={<p>loading...</p>} persistor={pstore}>
            {/* アプリケーションのメインコンポーネントをレンダリング */}
            <App />
        </PersistGate>
    </Provider>
);

// pstoreをエクスポート（これにより他のモジュールでpstoreを使用可能）
export default pstore;