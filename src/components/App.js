import React from "react";
import PokemonListContainer from "../containers/PokemonListContainer";
import Pokemon from "./Pokemon";
import Navigation from "./Navigation"
var ReactRouter = require("react-router-dom");
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

class App extends React.Component {
	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll.bind(this));
		document.querySelector(".scroll-up").style.display = "none";
	}

	handleScroll() {


		console.log('test')
		// Get scroll position
		// if scroll position is above 100px, display the "scroll to top" button, otherwise don't display the button
		// const scrollable =
		// document.documentElement.scrollHeight - window.innerHeight;
		const scrolled = window.scrollY;

		if (scrolled > 100) {
			document.querySelector(".scroll-up").style.display = "block";
		} else {
			document.querySelector(".scroll-up").style.display = "none";
		}

		// if (scrolled === scrollable) {
		//   console.log("hello");
		// }

	}

	handleClick() {
		if (window.pageYOffset > 100) {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		}
	}

	render() {
		return (
			<div>
				<Router>
					{/* <Navigation /> */}
					<Switch>
						<Route exact path="/pokemon/:id" component={Pokemon} />
						<Route exact path="/" component={PokemonListContainer} />
					</Switch>
				</Router>
				<button className="scroll-up" onClick={this.handleClick}>
					<i className="fa fa-chevron-up fa-3x" />
				</button>
			</div>
		);
	}
}

export default App;
