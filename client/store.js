import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'

import * as reducers from './reducers';

const reducer = combineReducers(reducers);
const devTools = window.devToolsExtension ? window.devToolsExtension() : (f) => f;
const enhancer = compose(
  applyMiddleware(ReduxThunk),
  devTools
);

const configureStore = (reducer, enhancer) => {
  const store = createStore(reducer, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default configureStore(reducer, enhancer);
