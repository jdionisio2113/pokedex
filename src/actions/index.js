import jsonPlaceholder from "../config/jsonPlaceholder";
import regeneratorRuntime from "regenerator-runtime";

export const FETCH_POKEMON = "FETCH_POKEMON";
export const RECEIVE_POKEMON = "RECEIVE_POKEMON";
export const REQUEST_FAILED = "REQUEST_FAILED";

export const fetchPokemon = () => async dispatch => {
  const response = await jsonPlaceholder.get("/1");

  dispatch({ type: RECEIVE_POKEMON, payload: response.data });
};
