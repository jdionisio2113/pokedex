import React from "react";
import PokemonListContainer from "../containers/PokemonListContainer";
import PokemonType from "./PokemonType";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";
import axios from "axios";
// import Search from "./Search";
// import findPokemon from "../actions";

class PokemonList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      collection: [],
      id: ""
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.displaySearch = this.displaySearch.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll.bind(this));
    document.querySelector(".scroll-up").style.display = "none";
  }

  handleSearch(e) {
    var value = e.target.value;
    const { pokemon } = this.props;

    clearTimeout(this.myTimeout);

    this.myTimeout = setTimeout(() => {
      this.setState({
        input: value
      });

      console.log(value);
      pokemon.pokedex.map(poke => {
        var name = poke.pokemon_species.name;
        var entry_number = poke.entry_number;
        if (name.includes(value.toLowerCase())) {
          this.setState({
            collection: name,
            id: entry_number
          });
        } else {
          this.displayFirst12();
        }
      });
      // console.log(this.props.findPokemon(value));
    }, 600);
  }

  displaySearch() {
    const { pokemon } = this.props;
    if (this.state.input.length > 0) {
      document.querySelector(".main-content").style.display = "none";
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
        this.state.id
      )}.png`;
      return (
        <div className="pokedex-content" key={this.state.id}>
          <div className="pokebox">
            <h2 className="pokemon-name">{this.state.collection}</h2>
            <img
              className="pokeball-logo"
              src={require("../images/pokeball.svg")}
            />
            <div className="description">
              <span>
                <PokemonTypeContainer entry_number={this.state.id} />
              </span>
              <img className="pokemon-image" src={imageUrl} />
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
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
      document.querySelector(".load-more").style.display = "none";
    }

    if (scrolled === scrollable) {
      this.props.displayNextBatch();
      // document.querySelector(".load-more").style.display = "none";
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
        <div className="input-container">
          <h1 className="logo">POKEDÉX</h1>
          <form>
            <input
              type="text"
              name="Search Pokemon"
              placeholder="Search"
              autoComplete="off"
              className="input"
              //   value={this.props.pokemnon.onChange}
              // onSubmit={this.handleSubmit}
              onChange={this.handleSearch}
            />
          </form>
          {/* <Search /> */}
          <div className="pokemon-container">{this.displaySearch()}</div>
        </div>
        <div className="main-content">
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
      </div>
    );
  }
}
export default PokemonList;
