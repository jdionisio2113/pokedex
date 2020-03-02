import React from "react";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";
import PokemonList from "./PokemonList";

class PokemonType extends React.Component {
	renderType() {
		const { pokemonInfo } = this.props;
		if (!pokemonInfo) {
			return null;
		}

		return pokemonInfo.types.map((poke, index) => {
			var name = poke.type.name;
			var type_className = "";

			switch (name) {
				case "fire":
					type_className = "fire-type";
					break;
				case "grass":
					type_className = "grass-type";
					break;

				case "poison":
					type_className = "poison-type";
					break;

				case "water":
					type_className = "water-type";
					break;

				case "flying":
					type_className = "flying-type";
					break;

				case "bug":
					type_className = "bug-type";
					break;

				case "normal":
					type_className = "normal-type";
					break;

				case "electric":
					type_className = "electric-type";
					break;

				case "ground":
					type_className = "ground-type";
					break;

				case "fairy":
					type_className = "fairy-type";
					break;

				case "fighting":
					type_className = "fighting-type";
					break;

				case "psychic":
					type_className = "psychic-type";
					break;

				case "rock":
					type_className = "rock-type";
					break;

				case "steel":
					type_className = "steel-type";
					break;

				case "ice":
					type_className = "ice-type";
					break;

				case "ghost":
					type_className = "ghost-type";
					break;

				case "dragon":
					type_className = "dragon-type";
					break;

				case "dark":
					type_className = "dark-type";
					break;

				default:
			}

			return (
				<div key={index} className="type">
					<p className={type_className}>{poke.type.name}</p>
				</div>
			);
		});
	}

	render() {
		return <div className="type-box">{this.renderType()}</div>;
	}
}

export default PokemonType;
