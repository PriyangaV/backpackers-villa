import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import rentals from './reducers/rentals';
import rental from './reducers/rental';
import auth from './reducers/auth';
import manage from './reducers/manage';
/* const store = {
  rentals: () => rentalData,
  data1: () => ['1', '2', '3'],
  data2: () => ['a', 'b', 'c']
}; */

/* const addPromiseToDispatch = (store) => {
  const { dispatch } = store;

  // - Take action and dispatch
  // return funtion(action) {
  //dispatch(action)
  //}
  return (action) => {
    if (action.then && typeof action.then === 'function') {
      //return action.then(action => {
      //dispatch(action);
      // });
      return action.then(dispatch);
    }
    dispatch(action);
  };
}; */

/* const addThunkToDispatch = (store) => {
  const { dispatch } = store;
  return (action) => {
    if (action && typeof action === 'function') {
      return action(dispatch);
    }
    dispatch(action);
  };
}; */

export const initStore = () => {
  // Todo: PURE Functions, explain :)
  const reducers = combineReducers({
    rentals,
    rental,
    auth,
    manage
  });
  // const reduxExtension =
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__();
  // const store = createStore(reducers, applyMiddlewarereduxExtension);
  // const store = createStore(reducers, applyMiddleware(thunk));

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

  // store.dispatch = addPromiseToDispatch(store);
  // store.dispatch = addThunkToDispatch(store);
  return store;
};
