import React from "react";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";
import jsonPlaceholder from "../config/jsonPlaceholder";

class Pokemon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      data: {},
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
      .get(`/pokemon/${id}`)
      .then(res => {
        this.setState({
          isLoading: false,
          data: res.data
        });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  // individualPage() {
  //   const { id } = this.props.match.params;
  //   jsonPlaceholder.get(`/pokemon/${id}`).then(function(res) {
  //     var name = res.data.name;
  //     var id = res.data.id;

  //     console.log(name);
  //     var format_picture_id = function(num) {
  //       if (num <= 9) {
  //         return `00${num}`;
  //       } else if (num >= 10 && num <= 99) {
  //         return `0${num}`;
  //       } else {
  //         return num;
  //       }
  //     };

  //     var imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${format_picture_id(
  //       id
  //     )}.png`;

  //     return (
  //       <div className="poke-wrapper">
  //         <div className="pokemon-title">
  //           <h1>{name}</h1>
  //           <h3 className="poke-number">#{id}</h3>
  //         </div>
  //         <img className="poke-image" src={imageUrl} />
  //         <div className="type-container">
  //           <PokemonTypeContainer entry_number={id} />
  //         </div>
  //       </div>
  //     );
  //   });
  // }

  renderMarkup() {
    console.log(this.state.data);
    return null;
  }

  render() {
    const { isLoading, data, error } = this.state;
    return (
      <div className="pokemon-wrapper">
        {isLoading ? <p>loading</p> : this.renderMarkup()}
      </div>
    );
    // return null;
  }
}

export default Pokemon;
