import React from "react";
import PokemonListContainer from "../containers/PokemonListContainer";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";
// import SearchContainer from "../containers/SearchContainer";

class App extends React.Component {
  render() {
    return (
      <div>
        {/* <SearchContainer /> */}
        <PokemonListContainer />
      </div>
    );
  }
}

export default App;
