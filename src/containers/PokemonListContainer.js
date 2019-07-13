import React from "react";
import { connect } from "react-redux";
import { receivePokemon, displayNextBatch, scrollToTop } from "../actions";
import PokemonList from "../components/PokemonList";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";

class PokemonListContainer extends React.Component {
  componentDidMount() {
    this.props.receivePokemon();
  }

  displayScrollUpButton() {
    // if (window.pageYOffset > 200) {
    //   // window.scrollTo(0, 0);
    //   document.querySelector(".scroll-up").style.display = "block";
    // } else {
    //   // document.querySelector(".scroll-up").style.display = "none";
    // }

    console.log("hi");

    // if (window.pageYOffset > 200) {
    // }

    // return (
    //   <button className="scroll-up" onClick={this.handleClick}>
    //     Scroll Into View
    //   </button>
    // );
  }

  handleClick() {
    if (window.pageYOffset > 200) {
      window.scrollTo(0, 0);
      // document.querySelector(".scroll-up").style.display = "block";
    } else {
      // document.querySelector(".scroll-up").style.display = "none";
    }
  }

  render() {
    console.log(this.props.pokemon);
    // if (this.props.pokemon.displayUpButton === true) {
    //   return <button>hi</button>;
    // }
    return (
      <div>
        <PokemonList pokemon={this.props.pokemon} />
        <button className="load-more" onClick={this.props.displayNextBatch}>
          loadMore
        </button>
        {/* {!this.props.pokemon.displayUpButton ? ( */}
        <button className="scroll-up" onClick={this.handleClick}>
          <i className="fas fa-arrow-alt-circle-up" aria-hidden="true" />
          {/* <i class="fas fa-arrow-up" aria-hidden="true" /> */}
          {/* <i className="fa fa-search" aria-hidden="true" /> */}
          SCROLL UP
        </button>
        {/* ) : null} */}
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
