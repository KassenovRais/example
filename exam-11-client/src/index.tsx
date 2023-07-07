import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './Store/News.store'
import { Provider } from 'react-redux';
import commentReducer from'./Store/Comment.store'

const store = configureStore({
  reducer:{
    news:newsReducer,
    comment: commentReducer
  }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider
    store={store}
  >
    <App />

  </Provider>
);

