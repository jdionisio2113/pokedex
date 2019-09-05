import React from "react";
import { connect } from "react-redux";
import {
	receivePokemon,
	displayNextBatch,
	update_queried_pokemon
} from "../actions";
import PokemonList from "../components/PokemonList";

class PokemonListContainer extends React.Component {
	componentDidMount() {
		this.props.receivePokemon();
	}

	render() {
		return (
			<div>
				<PokemonList
					pokemon={this.props.pokemon}
					displayNextBatch={this.props.displayNextBatch}
					update_queried_pokemon={this.props.update_queried_pokemon}
				/>
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
	{ receivePokemon, displayNextBatch, update_queried_pokemon }
)(PokemonListContainer);
