import { FETCH_POKEMON, RECEIVE_POKEMON, REQUEST_FAILED } from "../actions";

const initialState = {
  pokedex: [],
  isFetching: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POKEMON:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_POKEMON:
      return {
        ...state,
        isFetching: false,
        pokedex: action.payload
      };
    case REQUEST_FAILED:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};
