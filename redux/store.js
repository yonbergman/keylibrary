import { createStore, combineReducers } from 'redux';

import CardReducer from './CardReducer';

const store = createStore(combineReducers({
  cards: CardReducer
}));

export default store;
