import React from "react";
import PokemonListContainer from "../containers/PokemonListContainer";
import PokemonType from "./PokemonType";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";
// import { img } from "../images/pokeball.png";

class PokemonList extends React.Component {
  renderList() {
    return this.props.pokemon.pokedex.map(pokemon => {
      // console.log(pokemon.entry_number);
      //   var pokemonImage1 = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${
      //     pokemon.entry_number
      //   }.png`;
      //   var pokemonImage2 = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${
      //     pokemon.entry_number
      //   }.png`;
      //   var pokemonImage3 = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${
      //     pokemon.entry_number
      //   }.png`;

      //   var pokemonImage1 = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${
      //     pokemon.entry_number
      //   }.png`;
      //   https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${
      //     pokemon.entry_number
      //   }.png`;
      var pokemonImage1 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        pokemon.entry_number
      }.png`;
      //   console.log(pokemonImage1);
      //   var pokemonImage = `https://img.pokemondb.net/artwork/${
      //     pokemon.pokemon_species.name
      //   }.jpg`;
      return (
        // <Link to={`/pokemon`}></Link>
        <div
          data-id={pokemon.entry_number}
          className="pokedex-content"
          key={pokemon.entry_number}
        >
          <div className="pokebox">
            <h2 className="pokemon-name">{pokemon.pokemon_species.name}</h2>
            <img
              className="pokeball-logo"
              src={require("../images/pokeball.png")}
            />
            <div className="description">
              <span>
                <PokemonTypeContainer entry_number={pokemon.entry_number} />
              </span>
              <img className="pokemon-image" src={pokemonImage1} />
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="pokemon-container">
        {this.renderList()}
        {/* <PokemonTypeContainer /> */}
      </div>
    );
  }
}
export default PokemonList;
