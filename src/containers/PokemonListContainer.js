import React from "react";
import { connect } from "react-redux";
import { receivePokemon } from "../actions";
import PokemonList from "../components/PokemonList";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";

class PokemonListContainer extends React.Component {
  componentDidMount() {
    this.props.receivePokemon();
  }

  render() {
    return (
      <div>
        <PokemonList pokemon={this.props.pokemon} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pokemon: state.pokemon
  };
};

export default connect(
  mapStateToProps,
  { receivePokemon }
)(PokemonListContainer);
