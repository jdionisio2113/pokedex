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
      noEvo: "",
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
          axios.get(data.evolution_chain.url).then(res => {
            var baseForm = res.data.chain.species.url;

            var evolution_chain;
            (function foo(obj, arr) {
              var collection = arr ? arr : [];
              // var x = obj.evolves_to.map(res => {
              //   console.log(res);
              // });

              if (obj.evolves_to && obj.evolves_to.length > 0) {
                obj.evolves_to.map(item => {
                  collection.push(item);
                  foo(item, collection);
                });
              } else {
                evolution_chain = collection.map(function(item) {
                  // console.log(item);
                  return get(item.species.url);
                });
              }

              if (obj.evolves_to === undefined || obj.evolves_to.length == 0) {
                return console.log("This pokémon has no evolutions");
              } else {
                return null;
              }
            })(res.data.chain);

            var evolution_chain_strings = [get(baseForm), ...evolution_chain];
            all(evolution_chain_strings)
              .then(data => {
                this.setState({
                  evolutionChain: data
                });
                console.log(this.state.evolutionChain);
              })
              .catch(function(err) {
                console.warn(err);
              });
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
    // console.log(this.state.evolutionId);
    // console.log(this.state.evolutionChain);
    return (
      <div className="evo-container">
        <div className="evo_wrapper">
          <h2 className="evo_title">Evolutions</h2>
          <div className="evo_chart">
            {this.state.evolutionChain.map(res => {
              var evo_id = res.data.id;
              var evo_name = res.data.name;
              var format_picture_id = function(num) {
                if (num <= 9) {
                  return `00${num}`;
                } else if (num >= 10 && num <= 99) {
                  return `0${num}`;
                } else {
                  return num;
                }
              };

              var evoImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${format_picture_id(
                evo_id
              )}.png`;

              return (
                <div key={evo_id}>
                  <div className="evolution_box">
                    <img className="evolution-image" src={evoImage} />
                    <h2 className="evo_name">{evo_name}</h2>
                    <span>
                      <PokemonTypeContainer entry_number={evo_id} />
                    </span>
                  </div>
                  {/* <i className="fa fa-chevron-down fa-3x" /> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  renderMarkup() {
    const { data, stats, descriptions, evolutionChain } = this.state;
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

    var imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${format_picture_id(
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
              <p className="info">{english_entry}</p>
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
        {evolutionChain.length > 0 ? this.evolutionChain() : null}
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
    const { isLoading, data, error, descriptions } = this.state;
    return (
      <div className="pokemon-wrapper">
        {isLoading ? <p>loading</p> : this.renderMarkup()}
      </div>
    );
  }
}

export default Pokemon;
