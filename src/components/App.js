import React from "react";
import PokemonListContainer from "../containers/PokemonListContainer";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";
import Pokemon from "./Pokemon";
var ReactRouter = require("react-router-dom");
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

class App extends React.Component {
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll.bind(this));
    document.querySelector(".scroll-up").style.display = "none";
  }

  handleScroll() {
    // Get scroll position
    // if scroll position is above 500px, display the "scroll to top" button, otherwise don't display the button
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    if (scrolled > 100) {
      document.querySelector(".scroll-up").style.display = "block";
    } else {
      document.querySelector(".scroll-up").style.display = "none";
      // document.querySelector(".load-more").style.display = "none";
    }
  }

  handleClick() {
    if (window.pageYOffset > 100) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={PokemonListContainer} />
            <Route exact path="/pokemon/:id" component={Pokemon} />
          </Switch>
        </Router>
        <button className="scroll-up" onClick={this.handleClick}>
          SCROLL UP
        </button>
      </div>
    );
  }
}

export default App;
