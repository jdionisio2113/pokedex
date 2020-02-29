import React from "react";
import { Link } from "react-router-dom";

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "",
            error: false
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    /**
		 *  Updates markup in .main-content based on user's query
		 *  @param Object e
		 *  @return
		 */
    handleSearch(e) {
        var value = e.target.value;

        this.setState({ input: value });

        clearTimeout(this.myTimeout);

        this.myTimeout = setTimeout(() => {
            const { pokemon } = this.props;

            // filter pokemon from pokedex based on user_input
            var filtered_pokemon = pokemon.pokedex.filter(pk => {
                var pk_name = pk.pokemon_species.name.toLowerCase();
                var user_input = value.toLowerCase();

                if (pk_name.indexOf(user_input) !== -1) {
                    return pk;
                }
            });

            // If input value is empty, update queried pokemon,
            // to contain an empty array so pokemon_to_display
            // will display
            if (value === "") {
                this.props.update_queried_pokemon([]);
                this.setState({
                    error: false
                });
                document.querySelector(".load-more").style.visibility = "visible";

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
                document.querySelector(".load-more").style.visibility = "hidden";
            }
        }, 500);
    }


    render() {
        return (
            <div className="nav">
                <Link to={{ pathname: "/" }}>
                    <h1 className="logo">POKEDÉX</h1>
                </Link>

                <input
                    type="text"
                    name="Search Pokemon"
                    placeholder="Search"
                    autoComplete="off"
                    className="input"
                    onChange={this.handleSearch}
                    value={this.state.input}
                />
            </div>)
    }
}

export default Navigation