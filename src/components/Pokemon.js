import React from "react";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";
import jsonPlaceholder from "../config/jsonPlaceholder";
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
      evolutionName: [],
      evolutionId: [],
      error: false
    };

    this.renderMarkup = this.renderMarkup.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.setState({
      isLoading: true
    });

    jsonPlaceholder
      .get(`/pokemon-species/${id}`)
      .then(res => {
        this.setState({
          isLoading: false,
          descriptions: res.data
        });

        return res.data;
      })

      .then(data => {
        if (data.evolution_chain.url) {
          var self = this;
          axios.get(data.evolution_chain.url).then(function(res) {
            console.log(res.data);
            var baseForm = res.data.chain.species.url;
            var secondaryForm = res.data.chain.evolves_to[0].species.url;
            var finalForm =
              res.data.chain.evolves_to[0].evolves_to[0].species.url;

            var baseUrl = res.data.chain.species.url;

            all([get(baseForm), get(secondaryForm), get(finalForm)]).then(
              res => {
                var base_Id = res[0].data.id;
                var secondary_Id = res[1].data.id;
                var final_Id = res[2].data.id;

                // console.log(res[0].data.name);
                var baseName = res[0].data.name;
                var secondaryName = res[1].data.name;
                var finalName = res[2].data.name;

                var format_picture_id = function(num) {
                  if (num <= 9) {
                    return `00${num}`;
                  } else if (num >= 10 && num <= 99) {
                    return `0${num}`;
                  } else {
                    return num;
                  }
                };

                var evo1 = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${format_picture_id(
                  base_Id
                )}.png`;
                var evo2 = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${format_picture_id(
                  secondary_Id
                )}.png`;

                var evo3 = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${format_picture_id(
                  final_Id
                )}.png`;

                console.log(evo2);

                self.setState({
                  evolutionChain: [evo1, evo2, evo3],
                  evolutionName: [baseName, secondaryName, finalName],
                  evolutionId: [base_Id, secondary_Id, final_Id]
                });
              }
            );
          });
        }
      });

    jsonPlaceholder
      .get(`/pokemon/${id}`)
      .then(res => {
        this.setState({
          isLoading: false,
          data: res.data,
          stats: res.data.stats
        });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  evolutionChain() {
    return (
      <div className="evo-container">
        <h2 className="evo_title">Evolutions</h2>
        <div className="evo_chart">
          <div className="evolution_box">
            <img
              className="evolution-image"
              src={this.state.evolutionChain[0]}
            />
            <h2 className="evo_name">{this.state.evolutionName[0]}</h2>
            <span>
              <PokemonTypeContainer entry_number={this.state.evolutionId[0]} />
            </span>
          </div>
          <i class="fa fa-chevron-down fa-3x" />
          <div className="evolution_box">
            <img
              className="evolution-image"
              src={this.state.evolutionChain[1]}
            />
            <h2 className="evo_name">{this.state.evolutionName[1]}</h2>
            <span>
              <PokemonTypeContainer entry_number={this.state.evolutionId[1]} />
            </span>
          </div>
          <i class="fa fa-chevron-down fa-3x" />
          <div className="evolution_box">
            <img
              className="evolution-image"
              src={this.state.evolutionChain[2]}
            />
            <h2 className="evo_name">{this.state.evolutionName[2]}</h2>
            <span>
              <PokemonTypeContainer entry_number={this.state.evolutionId[2]} />
            </span>
          </div>
        </div>
      </div>
    );
  }

  renderMarkup() {
    const { data, stats, descriptions } = this.state;
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

    var format_picture_id = function(num) {
      if (num <= 9) {
        return `00${num}`;
      } else if (num >= 10 && num <= 99) {
        return `0${num}`;
      } else {
        return num;
      }
    };

    var imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${format_picture_id(
      id
    )}.png`;

    return (
      <div className="poke-wrapper">
        <div className="pokemon-title">
          <h1>{name}</h1>
          <h3 className="poke-number">#{id}</h3>
        </div>
        <div className="profile">
          <div className="column1">
            <img className="poke-image" src={imageUrl} />
            <div className="type-container">
              <PokemonTypeContainer entry_number={id} />
            </div>

            <div className="description">
              <p>{english_entry}</p>
            </div>
          </div>
          <div className="description-container">
            <div className="stats-wrapper">
              <h3>BASE STATS</h3>
              {stats.map((stat, index) => {
                var statNumber = stat.base_stat;
                var stat_title = stat.stat.name;
                var speed = "";
                var specialDefense = "";
                var specialAttack = "";
                var defense = "";
                var attack = "";
                var hp = "";

                // console.log(stats);

                switch (stat_title) {
                  case "speed":
                    speed = statNumber + "px";

                  case "special-defense":
                    specialDefense = statNumber + "px";

                  case "special-attack":
                    specialAttack = statNumber + "px";

                  case "defense":
                    defense = statNumber + "px";

                  case "attack":
                    attack = statNumber + "px";

                  case "hp":
                    hp = statNumber + "px";

                  default:
                }

                return (
                  <div className="stats-container" key={index}>
                    <p className="stats">{stat_title}:</p>
                    {/* {statNumber} */}
                    <div className="meter">
                      <span
                        className="width"
                        style={{
                          width: speed,
                          width: specialDefense,
                          width: specialAttack,
                          width: attack,
                          width: defense,
                          width: hp
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {this.state.evolutionChain.length > 0
          ? // <div>display evolution</div>
            this.evolutionChain()
          : null}
        {/* {this.evolutionChain()} */}

        <button className="explore-button">
          <Link
            to={{
              pathname: "/"
            }}
          >
            Explore More Pokémon
          </Link>
        </button>
      </div>
    );
  }
  render() {
    const { isLoading, data, error, descriptions, evolutionpic1 } = this.state;
    return (
      <div className="pokemon-wrapper">
        {isLoading ? <p>loading</p> : this.renderMarkup()}
      </div>
    );
  }
}

export default Pokemon;
