import React from "react";
import { connect } from "react-redux";
import { receivePokemonInfo } from "../actions";
import PokemonType from "../components/PokemonType";

class PokemonTypeContainer extends React.Component {
  componentDidMount() {
    this.props.receivePokemonInfo(this.props.entry_number);
  }

  // renderType() {
  //   const { pokemonInfo } = this.props;
  //   if (!pokemonInfo) {
  //     return null;
  //   }

  //   // console.log(this.props.pokemonInfo);

  //   return pokemonInfo.types.map(poke => {
  //     return <div>{poke.type.name}</div>;
  //   });
  // }

  render() {
    return (
      <div>
        <PokemonType pokemonInfo={this.props.pokemonInfo} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    //   find all unique userId's from lists of posts
    pokemonInfo: state.pokemonInfo.find(
      poke => poke.id === ownProps.entry_number
    )
  };
};

// export default connect(
//   mapStateToProps,
//   { receivePokemonInfo }
// )(PokemonTypeContainer);

export default connect(
  mapStateToProps,
  { receivePokemonInfo }
)(PokemonTypeContainer);
