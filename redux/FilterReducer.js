import {HouseFilter, RarityFilter, TypeFilter} from '../services/FilterSource';

var INITIAL_STATE = {
  // filter: state
};
HouseFilter.items.forEach((i) => INITIAL_STATE[i.name]=true)
RarityFilter.items.forEach((i) => INITIAL_STATE[i.name]=true)
TypeFilter.items.forEach((i) => INITIAL_STATE[i.name]=true)

export const toggleFilter = (key,value) => (
  {
    type: 'TOGGLE_FILTER',
    payload: {key, value},
  }
);

export default filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE_FILTER': 
      return {...state, [action.payload.key]: action.payload.value}
    case 'RESET_FILTERS': 
      return INITIAL_STATE
    default:
      return state
  }
};
