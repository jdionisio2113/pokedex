import React from "react";
import PokemonCard from "./PokemonCard";
import LoadingMessage from "./LoadingMessage";
import { Link } from "react-router-dom";

class PokemonList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: "",
			error: false
		};

		this.handleSearch = this.handleSearch.bind(this);
		this.displayPokemon = this.displayPokemon.bind(this);
		this.populateMainContent = this.populateMainContent.bind(this);
	}

	/**
		 *  Updates markup in .main-content based on user's query
		 *  @param Object e
		 *  @return
		 */
	handleSearch(e) {
		this.setState({ value: e.target.value });

		clearTimeout(this.myTimeout);

		this.myTimeout = setTimeout(() => {
			const { pokemon } = this.props;

			// filter pokemon from pokedex based on user_input
			var filtered_pokemon = pokemon.pokedex.filter(pk => {
				var pk_name = pk.pokemon_species.name.toLowerCase();
				var user_input = this.state.value.toLowerCase();

				if (pk_name.indexOf(user_input) !== -1) {
					return pk;
				}
			});

			// If input value is empty, update queried pokemon,
			// to contain an empty array so pokemon_to_display
			// will display
			if (this.state.value === "") {
				this.props.update_queried_pokemon([]);
				this.setState({
					error: false
				});

				// If no pokemon is found based on user's query,
				// set state.error to true to show "no pokemon found"
			} else if (filtered_pokemon.length === 0) {
				this.props.update_queried_pokemon(filtered_pokemon);
				this.setState({
					error: true
				});
			} else {
				this.setState({
					error: false
				});
				this.props.update_queried_pokemon(filtered_pokemon);
			}
		}, 500);
	}

	/**
		 *  queried_pokmeon takes precedence over pokemon_to_display
		 *  If user searched for pokemon, display the pokemon from
		 *  queried_pokemon. Otherwise, display pokemon from pokemon_to_display
		 *  @param
		 *  @return
		 */
	displayPokemon() {
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

	/**
		*  Decised whether to display error message, loading interface,
		*  or pokemon list based on any errors found in props or staste or
		*  if application is currently fetching pokemon from server
		*  @param
		*  @return Object markup
		*/
	populateMainContent() {
		const { error: apiError, isFetching, queried_pokemon } = this.props.pokemon;
		const { error: queryError } = this.state;

		if (queryError || apiError !== "") {
			return (
				<h3 className="error_message">
					NO POKÉMON MATCHED YOUR SEARCH
			</h3>
			);
		} else if (isFetching) {
			return <LoadingMessage />
		} else {
			return (
				<>
					<div className="pokemon-container">
						{this.displayPokemon()}
					</div>
					<div className="load">

						{queried_pokemon.length === 0 ? <button
							className="load-more"
							onClick={this.props.displayNextBatch}
						>
							Load More Pokémon
						</button> : null}

					</div>
				</>
			)
		}
	}

	render() {
		return (
			<div className="pokedex-container">
				<div className="input-container">
					<div className="nav">
						<a href="/">
							<h1 className="logo">POKEDÉX</h1>
						</a>

						<input
							type="text"
							name="Search Pokemon"
							placeholder="Search"
							autoComplete="off"
							className="input"
							onChange={this.handleSearch}
							value={this.state.value}
						/>
					</div>
				</div>
				<div className="main-content">
					{this.populateMainContent()}
				</div>
			</div>
		);
	}
}
export default PokemonList;
