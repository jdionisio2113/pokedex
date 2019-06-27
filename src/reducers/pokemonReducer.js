import { FETCH_POKEMON, RECEIVE_POKEMON, REQUEST_FAILED } from "../actions";

const initialState = {
  pokemonCollection: [],
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
        pokemonCollection: action.payload
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
