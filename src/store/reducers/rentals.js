/*
  - ? PURE Functions means, we'll never mutate the arguments of the function
  - ? No API calls, no route transitions, no side effects
  - ? No unpredictable results like Math.random()
  ! like this state.rentals = [];
*/

import { combineReducers } from 'redux';
import { isFetchingReducer } from './common';

const initRentalsReducer = () => {
  const items = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_RENTALS':
        return action.rentals;
      case 'CREATE_RENTAL':
        return [...state, action.rental];
      default:
        return state;
    }
  };

  const isFetching = isFetchingReducer('rentals');

  return combineReducers({ items, isFetching });
};

const rentals = initRentalsReducer();
export default rentals;

/* const rentals = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_RENTALS':
      return action.rentals;
    case 'CREATE_RENTAL':
      return [...state, action.rental];
    default:
      return state;
  }
};
export default rentals; */
