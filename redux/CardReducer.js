import { combineReducers } from 'redux';
import produce from "immer";
import {HouseFilter, RarityFilter, TypeFilter} from '../services/FilterSource';

var INITIAL_FILTER_STATE = {
};
HouseFilter.items.forEach((i) => INITIAL_FILTER_STATE[i.name]=true)
RarityFilter.items.forEach((i) => INITIAL_FILTER_STATE[i.name]=true)
TypeFilter.items.forEach((i) => INITIAL_FILTER_STATE[i.name]=true)

const LOAD_CARDS = 'LOAD_CARDS';
const LOADED_CARDS = 'LOADED_CARDS';
const FILTER_CARDS = 'FILTER_CARDS';
const TOGGLE_FILTER = 'TOGGLE_FILTER';
const SEARCH_CARDS = 'SEARCH_CARDS';

var INITIAL_STATE = {
  filters: INITIAL_FILTER_STATE,
  query: null,
  loaded: false,
  loading: false,
  cardData: [],
  data: [],
};

const filterCards = (state) => {
  const { cardData, filters, query } = state;
  var cards = query ? cardData.filter((card) => card.name.indexOf(query) > -1) : cardData;
  const houses = HouseFilter.items.filter((i) => filters[i.name]).map((i) => i.name)
  cards = cards.filter((card) => houses.includes(card.house))
  const types = TypeFilter.items.filter((i) => filters[i.name]).map((i) => i.name)
  cards = cards.filter((card) => types.includes(card.type))
  const rarirty = RarityFilter.items.filter((i) => filters[i.name]).map((i) => i.name)
  cards = cards.filter((card) => rarirty.includes(card.rarity))
  return cards
}

export default cardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADED_CARDS: 
      return {...state, loaded: true, loading: false, cardData: action.payload.cards, data: action.payload.cards}
    case SEARCH_CARDS:
      return produce(state, (s) => {
        s.query = action.payload.query
        s.data = filterCards(s)
      })
    case TOGGLE_FILTER: 
      return produce(state, (s) => {
        s.filters[action.payload.key] = action.payload.value
        s.data = filterCards(s)
      })
    default:
      return state
  }
};

export const loadedCards = (cards) => (
  {
    type: LOADED_CARDS,
    payload: {cards},
  }
);

export const searchCards = (query) => (
  {
    type: SEARCH_CARDS,
    payload: {query},
  }
);


export const toggleFilter = (key,value) => (
  {
    type: 'TOGGLE_FILTER',
    payload: {key, value},
  }
);
