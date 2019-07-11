import React from "react";
import { connect } from "react-redux";
import { receivePokemon, displayNextBatch } from "../actions";
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
        <button onClick={this.props.displayNextBatch}>loadMore</button>
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
  { receivePokemon, displayNextBatch }
)(PokemonListContainer);
