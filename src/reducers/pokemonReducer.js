import { FETCH_POKEMON, RECEIVE_POKEMON, REQUEST_FAILED } from "../actions";

const initialState = {
  pokedex: [],
  pokemon_to_display: [],
  isFetching: false
};

export default (state = initialState, action) => {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    case FETCH_POKEMON:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_POKEMON:
      var pokeToDisplay = action.payload.slice(0, 20);
      return {
        ...state,
        isFetching: false,
        pokedex: action.payload,
        pokemon_to_display: pokeToDisplay
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
