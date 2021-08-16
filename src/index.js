import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {Reducer} from './Reducer'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
//import createSagaMiddleware from 'redux-saga'
//import  RootSaga from './Sagas'
//import * as firebase from 'firebase/app'
//import * as serviceWorker from './serviceWorker'  
//const sagaMiddleware = createSagaMiddleware()
const store = createStore(Reducer)//,applyMiddleware(sagaMiddleware))
//sagaMiddleware.run(RootSaga,store)
ReactDOM.render (
        <Provider store={store}>
        <Router>
        <App/>
        </Router>
        </Provider>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.register();
