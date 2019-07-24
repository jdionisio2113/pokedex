import React from "react";
import PokemonListContainer from "../containers/PokemonListContainer";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";
var ReactRouter = require("react-router-dom");
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={PokemonListContainer} />
            <Route exact path="/pokemon" component={PokemonListContainer} />
            {/* <PokemonListContainer /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
