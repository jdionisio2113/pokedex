import React from "react";
import { Link } from "react-router-dom";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";

function PokemonCard({ pokemon }) {
  var name = pokemon.pokemon_species.name;
  var id = pokemon.entry_number;
  var format_picture_id = function(num) {
    if (num <= 9) {
      return `00${num}`;
    } else if (num >= 10 && num <= 99) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  var imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${format_picture_id(
    id
  )}.png`;
  return (
    <Link
      to={{
        pathname: `/pokemon/${id}`
      }}
    >
      <div className="pokedex-content">
        <div className="pokebox">
          <h2 className="pokemon-name">{name}</h2>
          <img
            className="pokeball-logo"
            src={require("../images/pokeball.svg")}
          />
          <div className="description">
            <PokemonTypeContainer entry_number={id} />
            <img className="pokemon-image" src={imageUrl} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard;
