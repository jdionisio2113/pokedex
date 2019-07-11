import React from "react";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";
import PokemonList from "./PokemonList";

var type_className = "";

class PokemonType extends React.Component {
  renderType() {
    const { pokemonInfo } = this.props;
    if (!pokemonInfo) {
      return null;
    }

    return pokemonInfo.types.map((poke, index) => {
      var name = poke.type.name;
      // var type_className = "";

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

        case "water":
          type_className = "water-type";
          break;

        case "flying":
          type_className = "flying-type";
          break;

        case "bug":
          type_className = "bug-type";
          break;

        case "normal":
          type_className = "normal-type";
          break;

        case "electric":
          type_className = "electric-type";
          break;

        default:
      }

      console.log(type_className);

      return (
        <div key={index} className="type">
          <p className={type_className}>{poke.type.name}</p>
          {/* <PokemonList type_className={"type_className"} /> */}
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderType()}</div>;
  }
}

export default PokemonType;
