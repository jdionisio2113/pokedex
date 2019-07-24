import React from "react";
import PokemonListContainer from "../containers/PokemonListContainer";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";

class App extends React.Component {
  render() {
    return (
      <div>
        <PokemonListContainer />
      </div>
    );
  }
}

export default App;
