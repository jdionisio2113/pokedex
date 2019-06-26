import React from "react";
import { connect } from "react-redux";
import { fetchPokemon } from "../actions";

class PokemonList extends React.Component {
  componentDidMount() {
    this.props.fetchPokemon();
  }

  render() {
    console.log(this.props.pokemon);
    return <div>pokemon list</div>;
  }
}

const mapStateToProps = state => {
  pokemon: state.pokemon;
};

export default connect(
  mapStateToProps,
  { fetchPokemon }
)(PokemonList);
