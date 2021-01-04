import { Box, Button, Container, Flex, Heading, HStack, Image, Spinner, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../assets/placeholder.png';
import { PokemonContext } from '../context/PokemonContext';

const NewEvolutionChain = (props) => {
	const [ spriteArray, setSpriteArray ] = useState([]);
	const [ evolArray, setEvolArray ] = useState([]);
	const { cSetPokemonName } = useContext(PokemonContext);
	const [ evolutionExists, setEvolutionExists ] = useState(true);
	const [ loading, setLoading ] = useState(true);

	function addToSprite(pokemon, i) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon).then((res) => res.json()).then((result) => {
					setSpriteArray((spriteArray) => [
						...spriteArray,
						result.sprites.other['official-artwork'].front_default
					]);
					resolve(i + 1);
				});
			}, 10);
		});
	}

	async function generateSpriteArray(evolNames, i) {
		if (i == evolNames.length) {
			return;
		}
		let x = await addToSprite(evolNames[i], i);
		generateSpriteArray(evolNames, x);
	}

	function getSpriteArray() {
		var evolNames = [];
		fetch(props.url)
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				var i = result.chain;
				if (result.chain.evolves_to.length === 0) setEvolutionExists(false);
				while (i.evolves_to.length >= 0) {
					evolNames.push(i.species.name);
					setEvolArray((evolArray) => [ ...evolArray, i.species.name ]);
					if (i.evolves_to.length === 0) break;
					i = i.evolves_to[0];
				}
			})
			.then(() => {
				generateSpriteArray(evolNames, 0);
			})
			.then(() => {
				setLoading(false);
			});
	}

	useEffect(() => getSpriteArray(), []);

	if (!evolutionExists)
		return (
			<Heading size="sm" textAlign="center" fontWeight="normal">
				No evolution chain for this pokemon
			</Heading>
		);

	if (loading) return <Spinner />;

	return (
		<Container display="flex" justifyContent="space-around">
			{spriteArray.map((pokemon, index) => (
				<Flex
					flexDirection="column"
					align="center"
					p={2}
					onClick={() => {
						cSetPokemonName(evolArray[index]);
					}}
				>
					<Link>
						<Image
							alignSelf="center"
							fallbackSrc={placeholder}
							boxSize={[ '70px', '75px', '100px', '100px' ]}
							src={pokemon}
						/>
						<Heading size="xs" mt={2} textAlign="center">
							{/* {evolArray[index].charAt(0).toUpperCase() + evolArray[index].slice(1)} */}
							{evolArray[index]}
						</Heading>
					</Link>
				</Flex>
			))}
		</Container>
	);
};

export default NewEvolutionChain;
