import { Button, Container, Divider, Flex, HStack, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import placeholder from '../assets/placeholder.png';

const EvolutionChain = (props) => {
	const [ spriteURL, setSpriteURL ] = useState('');

	const pokeSpriteFromName = (pokemon) => {
		fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon)
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				setSpriteURL(result.sprites.other['official-artwork'].front_default);
			});

	};

	const getEvolutionChain = () => {
		fetch('https://pokeapi.co/api/v2/evolution-chain/1')
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				generateEvolutionChain(result.chain);
			});
	};

	const generateEvolutionChain = (chain) => {
		var ourChain = evolutionNames;
		ourChain.push(chain.species.name);
		setEvolutionNames(ourChain);
		console.log(chain.species.name);
		if (chain.evolves_to.length === 0) return;
		generateEvolutionChain(chain.evolves_to[0]);
	};

	const [ evolutionNames, setEvolutionNames ] = useState([]);

	useEffect(() => {
		getEvolutionChain(props.url);
	}, []);

	return (
		<Container display="flex" justifyContent="space-between">
			<Image
				alignSelf="center"
				fallbackSrc={placeholder}
				boxSize={[ '50px', '75px', '100px', '100px' ]}
				src={
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
				}
			/>
			<Image
				alignSelf="center"
				fallbackSrc={placeholder}
				boxSize={[ '50px', '75px', '100px', '100px' ]}
				src={
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png'
				}
			/>
			<Image
				alignSelf="center"
				fallbackSrc={placeholder}
				boxSize={[ '50px', '75px', '100px', '100px' ]}
				src={
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png'
				}
			/>
			<Button
				onClick={() => {
					console.log(spriteURL);
				}}
			>
				gas
			</Button>
		</Container>
	);
};

export default EvolutionChain;
