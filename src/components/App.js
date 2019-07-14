import React from "react";
import PokemonListContainer from "../containers/PokemonListContainer";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className="logo">POKEDÉX</h1>
        <PokemonListContainer />
      </div>
    );
  }
}

export default App;
