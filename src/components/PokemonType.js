import React from "react";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";

class PokemonType extends React.Component {
  renderType() {
    const { pokemonInfo } = this.props;
    if (!pokemonInfo) {
      return null;
    }

    return pokemonInfo.types.map((poke, index) => {
      var name = poke.type.name;
      var type_className = "";

      switch (name) {
        case "fire":
          type_className = "fire-type";
          break;
        case "grass":
          type_className = "grass-type";
          break;

        case "poison":
          type_className = "poison-type";
          break;

        default:
      }

      return (
        <div key={index} className="type">
          <p className={type_className}>{poke.type.name}</p>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderType()}</div>;
  }
}

export default PokemonType;
