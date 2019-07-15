import React from "react";
import PokemonListContainer from "../containers/PokemonListContainer";
import PokemonType from "./PokemonType";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";

class PokemonList extends React.Component {
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    document.querySelector(".scroll-up").style.display = "none";
  }

  handleScroll() {
    // Get scroll position
    // if scroll position is above 500px, display the "scroll to top" button, otherwise don't display the button
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    if (scrolled > 500) {
      document.querySelector(".scroll-up").style.display = "block";
    } else {
      document.querySelector(".scroll-up").style.display = "none";
    }

    if (scrolled === scrollable) {
      console.log("hello");
    }
  }

  handleClick() {
    if (window.pageYOffset > 200) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }

  displayFirst12() {
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
    return (
      <div className="pokedex-container">
        <div className="pokemon-container">{this.displayFirst12()}</div>
        <div className="load">
          <button className="load-more" onClick={this.props.displayNextBatch}>
            Load More Pokémon
          </button>
        </div>
        <button className="scroll-up" onClick={this.handleClick}>
          SCROLL UP
        </button>
      </div>
    );
  }
}
export default PokemonList;
