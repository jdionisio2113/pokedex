import jsonPlaceholder from "../config/jsonPlaceholder";
import _ from "lodash";
import regeneratorRuntime from "regenerator-runtime";

export const FETCH_POKEMON = "FETCH_POKEMON";
export const RECEIVE_POKEMON = "RECEIVE_POKEMON";
export const REQUEST_FAILED = "REQUEST_FAILED";
export const RECEIVE_POKEMON_INFO = "RECEIVE_POKEMON_INFO";
export const DISPLAY_NEXT_BATCH = "DISPLAY_NEXT_BATCH";

export const receivePokemon = () => async dispatch => {
  const response = await jsonPlaceholder.get("/pokedex/1");
  dispatch({
    type: RECEIVE_POKEMON,
    payload: response.data.pokemon_entries
  });
};

export const receivePokemonInfo = id => dispatch => {
  _receivePokemonInfo(id, dispatch);
};

const _receivePokemonInfo = _.memoize(async (id, dispatch) => {
  const response = await jsonPlaceholder.get(`/pokemon/${id}`);

  dispatch({ type: RECEIVE_POKEMON_INFO, payload: response.data });
});

export const displayNextBatch = () => dispatch => {
  dispatch({ type: DISPLAY_NEXT_BATCH });
};
