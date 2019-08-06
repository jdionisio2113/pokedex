import React from "react";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";
import jsonPlaceholder from "../config/jsonPlaceholder";
import { Link } from "react-router-dom";
import axios from "axios";

class Pokemon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      data: {},
      stats: [],
      descriptions: {},
      error: false
    };

    this.renderMarkup = this.renderMarkup.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.setState({
      isLoading: true
    });

    jsonPlaceholder.get(`/pokemon-species/${id}`).then(res => {
      this.setState({
        isLoading: false,
        descriptions: res.data
      });
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

  renderMarkup() {
    const { data, stats, descriptions, evolutionChain } = this.state;
    var name = data.name;
    var id = data.id;
    if (descriptions.flavor_text_entries) {
      var text = descriptions.flavor_text_entries[1].flavor_text;

      var filtered_entries = descriptions.flavor_text_entries.filter(text => {
        var language = text.language.name;
        if (language === "en") {
          // console.log(text);
          return text;
        }
      });
      var english_entry = filtered_entries[0].flavor_text;
    }

    if (descriptions.evolution_chain) {
      var url = descriptions.evolution_chain.url;
      // console.log(url);
      axios.get(url).then(res => {
        // console.log(res.data);

        var baseForm = res.data.chain.species.name;
        var secondaryForm = res.data.chain.evolves_to[0].species.name;
        var baseUrl = res.data.chain.species.url;
        // console.log(secondaryForm);

        // axios.get(baseUrl).then(res => {
        //   console.log(res.data.id);
        //   var baseFormId = res.data.id;
        // });
      });
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
        <img className="poke-image" src={imageUrl} />
        <div className="type-container">
          <PokemonTypeContainer entry_number={id} />
        </div>
        <div className="description">
          <p>{english_entry}</p>
        </div>
        <div className="stats-wrapper">
          <h3>BASE STATS</h3>
          {stats.map((stat, index) => {
            var statNumber = stat.base_stat;
            var stat_title = stat.stat.name;

            return (
              <div className="stats-container" key={index}>
                {/* <div className="progress-bar" style={{ width: statNumber }} /> */}
                <p className="stats">{stat_title}:</p>
                {statNumber}
              </div>
            );
          })}
        </div>
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
    // return null;
  }
}

export default Pokemon;
