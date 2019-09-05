import endpoint from "../config/endpoint";
import _ from "lodash";
import regeneratorRuntime from "regenerator-runtime";

import {
	RECEIVE_POKEMON,
	REQUEST_FAILED,
	FETCH_POKEMON,
	RECEIVE_POKEMON_INFO,
	DISPLAY_NEXT_BATCH,
	UPDATE_QUERIED_POKEMON
} from "../config/constants";

export const receivePokemon = () => async dispatch => {
	dispatch({
		type: FETCH_POKEMON
	});

	try {
		const response = await endpoint.get("/pokedex/1");
		// Use setTimeout to display loading interface
		// for at least 1 second to avoid a flashing loading
		// symbol whenever user is on fast network
		setTimeout(() => {
			dispatch({
				type: RECEIVE_POKEMON,
				payload: response.data.pokemon_entries
			});
		}, 1000);
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