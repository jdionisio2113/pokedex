import { RECEIVE_POKEMON_INFO } from "../config/constants";

export default (state = [], action) => {
	switch (action.type) {
		case RECEIVE_POKEMON_INFO:
			return [
				...state,
				action.payload
			];
		default:
			return state;
	}
};
