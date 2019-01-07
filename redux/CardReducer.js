import { combineReducers } from 'redux';
import produce from "immer";
import {HouseFilter, RarityFilter, TypeFilter} from '../services/FilterSource';
import { SortBySources, INITIAL_SORT} from '../services/SortSource';

var INITIAL_FILTER_STATE = {
};
HouseFilter.items.forEach((i) => INITIAL_FILTER_STATE[i.name]=true)
RarityFilter.items.forEach((i) => INITIAL_FILTER_STATE[i.name]=true)
TypeFilter.items.forEach((i) => INITIAL_FILTER_STATE[i.name]=true)

const LOADED_CARDS = 'LOADED_CARDS';
const TOGGLE_FILTER = 'TOGGLE_FILTER';
const SELECT_ALL_FILTERS = 'SELECT_ALL_FILTERS';
const DESELECT_ALL_FILTERS = 'DESELECT_ALL_FILTERS';
const SEARCH_CARDS = 'SEARCH_CARDS';
const SORT_CARDS = 'SORT_CARDS';

var INITIAL_STATE = {
  filters: INITIAL_FILTER_STATE,
  sortBy: INITIAL_SORT,
  query: null,
  loaded: false,
  loading: false,
  cardData: [],
  data: [],
};

const sortFunction = (sorter) => {
  return function(a,b) {
    return sorter.direction > 0 ? a[sorter.property] > b[sorter.property] : a[sorter.property] < b[sorter.property]
  }
}

const prepareCards = (state) => {
  const { cardData, filters, query, sortBy } = state;
  var cards = cardData;
  if (query) {
    var sanatizedQuery = query && query.toLowerCase().trim()
    if (sanatizedQuery.startsWith("+")) {
      sanatizedQuery = sanatizedQuery.slice(1);
      cards = cards.filter((card) => card.complexSearch.indexOf(sanatizedQuery) > -1);
    } else {
      cards = cards.filter((card) => card.simpleSearch.indexOf(sanatizedQuery) > -1);
    }
  }
  const houses = HouseFilter.items.filter((i) => filters[i.name]).map((i) => i.name)
  cards = cards.filter((card) => houses.includes(card.house))
  const types = TypeFilter.items.filter((i) => filters[i.name]).map((i) => i.name)
  cards = cards.filter((card) => types.includes(card.type))
  const rarirty = RarityFilter.items.filter((i) => filters[i.name]).map((i) => i.name)
  cards = cards.filter((card) => rarirty.includes(card.rarity))
  cards = cards.sort(sortFunction(sortBy))
  return cards
}

export default cardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADED_CARDS: 
      return {...state, loaded: true, loading: false, cardData: action.payload.cards, data: action.payload.cards}
    case SEARCH_CARDS:
      return produce(state, (s) => {
        s.query = action.payload.query
        s.data = prepareCards(s)
      })
    case TOGGLE_FILTER: 
      return produce(state, (s) => {
        s.filters[action.payload.key] = action.payload.value
        s.data = prepareCards(s)
      })
    case DESELECT_ALL_FILTERS:
      return produce(state, (s) => {
        Object.keys(s.filters).forEach((key) => s.filters[key] = false)
        s.data = []
      })
    case SELECT_ALL_FILTERS:
      return produce(state, (s) => {
        Object.keys(s.filters).forEach((key) => s.filters[key] = true)
        s.data = prepareCards(s)
      })
    case SORT_CARDS: 
      return produce(state, (s) => {
        s.sortBy = action.payload.sortBy
        s.data = prepareCards(s)
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
    type: TOGGLE_FILTER,
    payload: {key, value},
  }
);

export const sortCards = (sortBy) => (
  {
    type: SORT_CARDS,
    payload: {sortBy},
  }
);

export const deselectAllFilters = () => (
  {
    type: DESELECT_ALL_FILTERS,
    payload: {},
  }
);

export const selectAllFilters = () => (
  {
    type: SELECT_ALL_FILTERS,
    payload: {},
  }
);
