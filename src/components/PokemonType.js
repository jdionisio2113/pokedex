import React from "react";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";

class PokemonType extends React.Component {
  renderType() {
    const { pokemonInfo } = this.props;
    if (!pokemonInfo) {
      return null;
    }

    // console.log(this.props.pokemonInfo);

    return pokemonInfo.types.map((poke, index) => {
      return <div key={index}>{poke.type.name}</div>;
    });
  }

  render() {
    return <div>{this.renderType()}</div>;
  }
}

export default PokemonType;
