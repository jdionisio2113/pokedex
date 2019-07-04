import { RECEIVE_POKEMON_INFO } from "../actions";

// const initialState = {
//   pokemonInfo: [],
//   isFetching: false
// };

export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POKEMON_INFO:
      return [
        ...state,
        // isFetching: false,
        action.payload
      ];
    default:
      return state;
  }
};
