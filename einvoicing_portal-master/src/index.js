
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import './i18n'
import { I18nextProvider } from "react-i18next"
import i18next from "i18next";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { store } from './inv/store/configureStore'

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
);

