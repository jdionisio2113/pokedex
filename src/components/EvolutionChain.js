import React from "react";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";
import format_picture_id from "../utils/format_picture_id";
import { Link } from "react-router-dom";

const EvolutionChain = function({ evolutionChainArr }) {
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
};

export default EvolutionChain;
