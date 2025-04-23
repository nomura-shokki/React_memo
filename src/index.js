// Reactのライブラリをインポート
import React from 'react';
// ReactDOMの新しいAPI「createRoot」をインポート
import ReactDOM from 'react-dom/client';
// ReduxのProviderコンポーネントをインポート
import { Provider } from 'react-redux';
// グローバルスタイル（CSSファイル）をインポート
import './index.css';
// アプリケーションのメインコンポーネント「App」をインポート
import App from './App';
// メモ管理用のReduxストアをインポート
import MemoStore from './memo/Store';

// createRootを使用してReactアプリをレンダリング
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // Providerコンポーネントでアプリケーション全体をラップ
    <Provider store={MemoStore}>
        {/* アプリケーションのメインコンポーネント「App」をProvider内でレンダリング */}
        <App />
    </Provider>
);
