import { combineReducers } from "redux";
import pokemonReducer from "./pokemonReducer";
import typeReducer from "./typeReducer";

export default combineReducers({
  pokemon: pokemonReducer,
  pokemonInfo: typeReducer
});
