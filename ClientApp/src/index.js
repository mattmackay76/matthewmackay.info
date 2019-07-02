import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './App';
import reducers from './reducers';
import { unregister, register } from './registerServiceWorker';
import { INITIAL_AUTH_STATE } from './actions/types';

//we're storing the initial authReducer state in sessionState (globally to this tab)
//specifically so that authentication survives a refresh but that the information
//is not persisted, instead only lives in the browser's memory.
var initialAuthJson = window.sessionStorage.getItem(INITIAL_AUTH_STATE);

const initialState =
{
    authReducer:
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
    composeEnhancers(applyMiddleware(reduxThunk)),
    
);

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement);

register();
//unregister();
