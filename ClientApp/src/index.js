import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './App';
import reducers from './reducers';
import { register } from './registerServiceWorker'; //unregister also available
import { INITIAL_AUTH_STATE } from './actions/types';

//we're storing the initial auth state in sessionState (globally to this domain/tab)
//specifically so that authentication survives a refresh but that the information
//is not persisted, instead only lives in the browser's memory. Splitting
//the JWT token into payload/signature and storing signature in a cookie httpOnly, secure, self
//would considerably increase security against both XSS (Cross site scripting) as well as CORS (Cross-origin resource sharing)
var initialAuthJson = window.sessionStorage.getItem(INITIAL_AUTH_STATE);

const initialState =
{
    auth: 
        initialAuthJson ? //defined?
            JSON.parse(initialAuthJson)
            :
            {
                isLoggedIn: false,
                token: null
            }
};  

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(reduxThunk))
);

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement);

register(); //PWA service worker
