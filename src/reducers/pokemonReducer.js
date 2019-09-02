import {
    FETCH_POKEMON,
    RECEIVE_POKEMON,
    REQUEST_FAILED,
    DISPLAY_NEXT_BATCH,
    UPDATE_QUERIED_POKEMON
} from "../config/constants";

const initialState = {
    pokedex: [],
    pokemon_to_display: [],
    queried_pokemon: [],
    isFetching: false,
    error: ""
};

export default (state = initialState, action) => {
    if (typeof state === "undefined") {
        return initialState;
    }

    switch (action.type) {
        case FETCH_POKEMON:
            return {
                ...state,
                isFetching: true,
                error: ""
            };
        case RECEIVE_POKEMON:
            var pokeToDisplay = action.payload.slice(0, 12);

            return {
                ...state,
                isFetching: false,
                pokedex: action.payload,
                pokemon_to_display: pokeToDisplay,
                error: ""
            };
        case DISPLAY_NEXT_BATCH:
            // refer to the last pokemon in pokemon_to_display array

            // once i have the last pokemon, i will refer to that pokemon
            // in the pokedex array

            // after finding the pokemon in the next pokedex array,
            // i will grab the next twelve pokemon and add it to pokemon_to_display
            var lastPokemon =
                state.pokemon_to_display[state.pokemon_to_display.length - 1];
            var indexOfLastPokemon = state.pokedex.indexOf(lastPokemon);

            var batch = state.pokedex.slice(
                indexOfLastPokemon + 1,
                indexOfLastPokemon + 13
            );

            return {
                ...state,
                pokemon_to_display: [...state.pokemon_to_display, ...batch]
            };

        case UPDATE_QUERIED_POKEMON:
            return {
                ...state,
                queried_pokemon: action.payload,
                error: ""
            };

        case REQUEST_FAILED:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };

        default:
            return state;
    }
};
