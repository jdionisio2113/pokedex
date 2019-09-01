import endpoint from "../config/endpoint";
import _ from "lodash";
import regeneratorRuntime from "regenerator-runtime";

export const FETCH_POKEMON = "FETCH_POKEMON";
export const RECEIVE_POKEMON = "RECEIVE_POKEMON";
export const REQUEST_FAILED = "REQUEST_FAILED";
export const RECEIVE_POKEMON_INFO = "RECEIVE_POKEMON_INFO";
export const DISPLAY_NEXT_BATCH = "DISPLAY_NEXT_BATCH";
export const INPUT_VALUE = "INPUT_VALUE";
export const UPDATE_QUERIED_POKEMON = "UPDATE_QUERIED_POKEMON";

export const receivePokemon = () => async dispatch => {
  try {
    const response = await endpoint.get("/pokedex/1");
    dispatch({
      type: RECEIVE_POKEMON,
      payload: response.data.pokemon_entries
    })
  } catch (err) {
    dispatch({
      type: REQUEST_FAILED,
      error: err.toString()
    });
  }
};

export const receivePokemonInfo = id => dispatch => {
  _receivePokemonInfo(id, dispatch);
};

const _receivePokemonInfo = _.memoize(async (id, dispatch) => {
  const response = await endpoint.get(`/pokemon/${id}`);

  dispatch({ type: RECEIVE_POKEMON_INFO, payload: response.data });
});

export const displayNextBatch = () => dispatch => {
  try { dispatch({ type: DISPLAY_NEXT_BATCH }) }
  catch (err) {
    dispatch({
      type: REQUEST_FAILED,
      error: err.toString()
    });
  }
};

export const update_queried_pokemon = queried_pokemon => dispatch => {
  try { dispatch({ type: UPDATE_QUERIED_POKEMON, payload: queried_pokemon }) }
  catch (err) {
    dispatch({
      type: REQUEST_FAILED,
      error: err.toString()
    });
  }
};