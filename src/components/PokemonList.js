import React from "react";
// import PokemonListContainer from "../containers/PokemonListContainer";
import PokemonType from "./PokemonType";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";
import PokemonCard from "./PokemonCard";
import { Link } from "react-router-dom";

class PokemonList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      error: false
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.displayPokemon = this.displayPokemon.bind(this);
  }

  handleSearch(e) {
    var value = e.target.value;

    this.setState({ input: value });

    clearTimeout(this.myTimeout);

    this.myTimeout = setTimeout(() => {
      const { pokemon } = this.props;

      // filter pokemon from pokedex based on user_input
      var filtered_pokemon = pokemon.pokedex.filter(pk => {
        var pk_name = pk.pokemon_species.name.toLowerCase();
        var user_input = value.toLowerCase();

        if (pk_name.indexOf(user_input) !== -1) {
          return pk;
        }
      });

      if (value === "") {
        document.querySelector(".load-more").style.visibility = "visible";
        this.props.update_queried_pokemon([]);
        this.setState({
          error: false
        });
      } else if (filtered_pokemon.length === 0) {
        // document.querySelector(".load-more").style.visibility = "hidden";
        this.props.update_queried_pokemon(filtered_pokemon);
        this.setState({
          error: true
        });
      } else {
        document.querySelector(".load-more").style.visibility = "hidden";
        this.setState({
          error: false
        });
        this.props.update_queried_pokemon(filtered_pokemon);
      }
    }, 500);
  }

  displayPokemon() {
    // if user has an input value, display pokemon from queried_pokemon array

    // else

    // display pokemon from pokemon to disply array
    const { queried_pokemon, pokemon_to_display } = this.props.pokemon;

    if (queried_pokemon.length > 0) {
      return queried_pokemon.map(function (pokemon) {
        return <PokemonCard pokemon={pokemon} key={pokemon.entry_number} />;
      });
    } else {
      return pokemon_to_display.map(function (pokemon) {
        return <PokemonCard pokemon={pokemon} key={pokemon.entry_number} />;
      });
    }
  }

  render() {
    return (
      <div className="pokedex-container">
        <div className="input-container">
          <form className="nav">
            <Link to={{ pathname: "/" }}>
              <h1 className="logo">POKEDÉX</h1>
            </Link>

            <input
              type="text"
              name="Search Pokemon"
              placeholder="Search"
              autoComplete="off"
              className="input"
              onChange={this.handleSearch}
              value={this.state.input}
            />
          </form>
        </div>
        <div className="main-content">
          {this.state.error ? (
            <h3 className="error_message">NO POKÉMON MATCHED YOUR SEARCH</h3>
          ) : (
              <div className="pokemon-container">{this.displayPokemon()}</div>
            )}

          <div className="load">
            <button className="load-more" onClick={this.props.displayNextBatch}>
              Load More Pokémon
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default PokemonList;
