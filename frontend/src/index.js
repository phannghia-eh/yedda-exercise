import React from 'react';
import {render} from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from './reducers'
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import {syncHistoryWithStore} from "react-router-redux";
import mHistory from './history'
import axios from 'axios'

//IMPORT REACT_TOAST_CSS
import 'react-toastify/dist/ReactToastify.min.css'
// IMPORT BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css"

import * as serviceWorker from './serviceWorker';
import App from "./app.js";
import {ToastContainer} from "react-toastify";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

axios.defaults.headers['Authorization'] = localStorage.getItem('token')
let defaultPageSize = Number.parseInt(localStorage.getItem('defaultPageSize'))
if(!defaultPageSize) {
  localStorage.setItem('defaultPageSize', '10')
}

const history = syncHistoryWithStore(mHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <ToastContainer/>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
