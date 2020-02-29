import React from "react";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";
import PokemonContainer from "../containers/PokemonContainer";
import LoadingMessage from "./LoadingMessage";
import endpoint from "../config/endpoint";
import Statistics from "./Statistics";
import format_picture_id from '../utils/format_picture_id'
import EvolutionChain from './EvolutionChain';
import { Link } from "react-router-dom";
import axios from "axios";
import { all, get } from "axios";

class Pokemon extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			data: {},
			stats: [],
			descriptions: {},
			evolutionChain: [],
			error: false
		};

		this.renderMarkup = this.renderMarkup.bind(this);
		this.gatherProfileInfo = this.gatherProfileInfo.bind(this);
	}

	gatherProfileInfo() {
		const { id } = this.props.match.params;

		this.setState({
			isLoading: true
		});

		var data,
			stats,
			descriptions,
			evolutionChain = null;

		// Fetch pokemon's basic info (stats & image)
		endpoint
			.get(`/pokemon/${id}`)
			.then(res => {
				data = res.data,
					stats = res.data.stats

				// Fetch pokemon's description
				return endpoint.get(`/pokemon-species/${id}`);
			})
			.then(res => {
				descriptions = res.data;

				// Fetch evolution chain
				return axios.get(res.data.evolution_chain.url);
			})
			.then(res => {
				var baseForm = res.data.chain.species.url;
				var evolution_chain;

				// Use recursion to gather API endpoints for a pokemon's
				// evolution chain. Note: 1 URL per evolution
				(function collectEvolutionEndpoints(obj, arr) {
					var collection = arr ? arr : [];

					if (obj.evolves_to && obj.evolves_to.length > 0) {
						obj.evolves_to.map(item => {
							collection.push(item);
							collectEvolutionEndpoints(item, collection);
						});
					} else {
						evolution_chain = collection.map(function (item) {
							return get(item.species.url);
						});
					}
				})(res.data.chain);

				var evolution_chain_strings = [
					get(baseForm),
					...evolution_chain
				];
				// Fetch info to display evolution chain
				return all(evolution_chain_strings);
			})
			.then(res => {
				evolutionChain = res.map(obj => {
					return obj.data;
				})
				this.setState({
					isLoading: false,
					error: false,
					evolutionChain,
					data,
					stats,
					descriptions
				});
			})
			.catch(err => {
				this.setState({ error: true });
			});
	}

	componentDidMount() {
		this.gatherProfileInfo();
	}

	componentDidUpdate(prevProps) {
		if (
			parseInt(prevProps.match.params.id) !==
			parseInt(this.props.match.params.id)
		) {
			this.gatherProfileInfo();
		}
	}

	evolutionChain() {
		return (
			<div className="evo-container">
				<div className="evo_wrapper">
					<h2 className="evo_title">Evolutions</h2>
					<div className="evo_chart">
						{evolutionChainArr.map(pokemon => {
							var evo_id = pokemon.id;
							var evo_name = pokemon.name;

							var evoImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${format_picture_id(
								evo_id
							)}.png`;

							return (
								<div key={evo_id}>
									<Link to={{ pathname: `/pokemon/${evo_id}` }}>
										<div className="evolution_box">
											<img
												className="evolution-image"
												src={evoImage}
											/>
											<h2 className="evo_name">{evo_name}</h2>
											<span>
												<PokemonTypeContainer
													entry_number={evo_id}
												/>
											</span>
										</div>
									</Link>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}

	renderMarkup() {
		const {
			data,
			stats,
			descriptions,
			evolutionChain
		} = this.state;

		var name = data.name;
		var id = data.id;
		if (descriptions.flavor_text_entries) {
			var text = descriptions.flavor_text_entries[1].flavor_text;

			// Loop through descriptions.flavor_text_entries

			// Once you get the first english entry, store the entry
			// in a variable and stop the loop from running

			var { flavor_text_entries } = descriptions;
			var english_entry = null;

			for (let i = 0; i < flavor_text_entries.length && !english_entry; i++) {
				let text_entry = flavor_text_entries[i];
				if (text_entry.language.name === "en") {
					//store text_entry in variable english_entry
					english_entry = text_entry.flavor_text;
				}
			}
		}

		var imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${format_picture_id(
			id
		)}.png`;

		return (
			<div className="poke-wrapper">
				<button>
					<Link to={{ pathname: "/" }}><i class="fa fa-arrow-circle-left fa-3x back-button"></i></Link>
				</button>
				<div className="pokemon-title">
					<h1>{name}</h1>
					<h3 className="poke-number">#{id}</h3>
				</div>
				<div className="profile">
					<div className="pokemon-profile">
						<img className="poke-image" src={imageUrl} />
						<div className="type-container">
							<PokemonTypeContainer entry_number={id} />
						</div>

						<div className="description">
							<p className="info">{english_entry}</p>
						</div>
					</div>
					<div className="description-container">
						<Statistics stats={stats} />
					</div>
				</div>
				{evolutionChain.length > 0 ? <EvolutionChain evolutionChainArr={evolutionChain} />
					: null}
				<PokemonContainer />
			</div>
		);
	}

	render() {
		const { isLoading } = this.state;

		return (
			<div className="pokemon-wrapper">
				{isLoading ? <LoadingMessage /> : this.renderMarkup()}
			</div>
		);
	}
}

export default Pokemon;
