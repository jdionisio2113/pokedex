import React from "react";
import PokemonListContainer from "../containers/PokemonListContainer";
import PokemonType from "./PokemonType";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";
// import type_className from "./PokemonType";
// import { img } from "../images/pokeball.png";

class PokemonList extends React.Component {
  displayFirst20() {
    return this.props.pokemon.pokemon_to_display.map(pokemon => {
      var format_picture_id = function(num) {
        // If number is a single digit number, prepend the number
        // with 2 zeroes
        // if number is a double digit number, prepend the number with 1 zero
        // if both conditions fail, don;t prepend any zeroes

        if (num <= 9) {
          return `00${num}`;
        } else if (num >= 10 && num <= 99) {
          return `0${num}`;
        } else {
          return num;
        }
      };

      var imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${format_picture_id(
        pokemon.entry_number
      )}.png`;

      return (
        // <Link to={`/pokemon`}></Link>
        <div className="pokedex-content" key={pokemon.entry_number}>
          <div className="pokebox">
            <h2 className="pokemon-name">{pokemon.pokemon_species.name}</h2>
            <img
              className="pokeball-logo"
              src={require("../images/pokeball.svg")}
            />
            <div className="description">
              <span>
                <PokemonTypeContainer entry_number={pokemon.entry_number} />
              </span>
              <img className="pokemon-image" src={imageUrl} />
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="pokemon-container">{this.displayFirst20()}</div>;
  }
}
export default PokemonList;
