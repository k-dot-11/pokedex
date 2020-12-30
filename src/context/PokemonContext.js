import React, { createContext, Component } from 'react';

export const PokemonContext = createContext();

class PokemonContextProvider extends Component {
	state = {
		pokemonName: 'thisiscontext'
	};

	cSetPokemonName = (name) => {
		this.setState({ pokemonName: name });
		localStorage.setItem('pokemonName', name);
	};

	cGetPokemonName = () => {
		return localStorage.getItem('pokemonName');
	};

	render() {
		return (
			<PokemonContext.Provider value={{ ...this.state, cSetPokemonName: this.cSetPokemonName , cGetPokemonName: this.cGetPokemonName }}>
				{this.props.children}
			</PokemonContext.Provider>
		);
	}
}

export default PokemonContextProvider;
