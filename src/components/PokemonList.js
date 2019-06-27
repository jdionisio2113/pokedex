import React from "react";
import PokemonListContainer from "../containers/PokemonListContainer";
// import { img } from "../images/icons8-pokeballs-96.png";

class PokemonList extends React.Component {
  renderList() {
    return this.props.pokemon.pokedex.map(pokemon => {
      //   var pokemonImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${
      //     pokemon.entry_number
      //   }.png`;
      //   var pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      //     pokemon.entry_number
      //   }.png`;
      var pokemonImage = `https://img.pokemondb.net/artwork/${
        pokemon.pokemon_species.name
      }.jpg`;
      return (
        <div key={pokemon.entry_number}>
          <div className="pokebox">
            <h2 className="pokemon-name">{pokemon.pokemon_species.name}</h2>
            <div className="description">
              <span>type</span>
              <img className="pokemon-image" src={pokemonImage} />
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    console.log(this.props.pokemon);
    return <div className="pokemon-container">{this.renderList()}</div>;
  }
}
export default PokemonList;
