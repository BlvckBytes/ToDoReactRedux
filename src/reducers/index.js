import { combineReducers } from 'redux';
import { itemReducer } from './todo';

// Invoke combine reducers for keeping the ability to add more in the future
export const reducers = combineReducers( {
  todo: itemReducer,
} );