import React from "react";
import Pokemon from "../components/Pokemon";
import { update_queried_pokemon } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class PokemonContainer extends React.Component {
  constructor(props) {
    super(props);

    this.clickExploreButton = this.clickExploreButton.bind(this);
  }

  clickExploreButton() {
    // empty the queried_pokemon array found in redux store
    this.props.update_queried_pokemon([]);
  }
  render() {
    return (
      <Link
        to={{
          pathname: "/"
        }}
      >
        <button className="explore-button" onClick={this.clickExploreButton}>
          Explore More Pokémon
        </button>
      </Link>
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
  { update_queried_pokemon }
)(PokemonContainer);
