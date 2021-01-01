import { Button, Container, Divider, Flex, HStack, Image, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import placeholder from '../assets/placeholder.png';

const EvolutionChain = (props) => {
	const [ evolutionNames, setEvolutionNames ] = useState([]);
	const [ evolutionExists, setEvolutionExists ] = useState(true);
	const [ spriteArray, setSpriteArray ] = useState([]);
	const [ isLoading, setLoading ] = useState(true);

	const getEvolutionChain = (url) => {
		fetch(url)
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				if (result.chain.evolves_to.length === 0) setEvolutionExists(false);
				generateEvolutionChain(result.chain);
			})
			.then(() => {
				generateSpriteArray();
			})
			.then(() => {
				console.log(spriteArray);
				setLoading(false);
			});
	};

	const generateSpriteArray = () => {
		var ourArray = [];
		evolutionNames.map((pokemon) => {
			fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon)
				.then((res) => {
					return res.json();
				})
				.then((result) => {
					ourArray.push(result.sprites.other['official-artwork'].front_default);
					setSpriteArray(ourArray);
				});
		});
		console.log(spriteArray);
	};

	const generateEvolutionChain = (chain) => {
		var ourChain = evolutionNames;
		ourChain.push(chain.species.name);
		setEvolutionNames(ourChain);

		if (chain.evolves_to.length === 0) return;

		generateEvolutionChain(chain.evolves_to[0]);
	};
	if (isLoading) getEvolutionChain(props.url);

	if (isLoading) return <Spinner />;
	else {
		return (
			<Container display="flex" justifyContent="space-between">
				<HStack spacing={4} mb={3} mt={3}>
					{spriteArray.map((pokemon) => (
						<Image
							alignSelf="center"
							fallbackSrc={placeholder}
							boxSize={[ '50px', '75px', '100px', '100px' ]}
							src={pokemon}
						/>
					))}
				</HStack>
			</Container>
		);
	}
};

export default EvolutionChain;
