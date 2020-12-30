import {
	Flex,
	Heading,
	Image,
	theme,
	useColorModeValue,
	Progress,
	Container,
	SimpleGrid,
	Divider,
	Text,
	Stat,
	StatLabel,
	StatNumber,
	Spinner
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import placeholder from '../assets/placeholder.png';
import { PokemonContext } from '../context/PokemonContext';
import { darkColors, colors, themeColors } from '../colors/TypeColors';

const PokeDetailsPage = (props) => {
	const { pokemonName, cGetPokemonName } = useContext(PokemonContext);
	const currentColors = useColorModeValue(colors, darkColors);
	const [ isLoading, setLoading ] = useState(true);
	const [ typeColor, setTypeColor ] = useState(theme.colors.current);
	const [ typeGradient, setTypeGradient ] = useState('');
	const [ pokemon, setPokemon ] = useState({
		weight: '',
		height: '',
		name: '',
		types: [],
		stats: [],
		moves: [],
		abilities: []
	});
	const [ pokeDP, setPokeDP ] = useState('');

	useEffect(
		() => {
			fetch('https://pokeapi.co/api/v2/pokemon/' + (cGetPokemonName() || pokemonName))
				.then((res) => {
					if (res.status === 200) {
						console.log('Pokemon was found');
						return res.json();
					}
				})
				.then((result) => {
					//setting the primary color
					setTypeColor(currentColors[result.types[0].type.name]);

					//generating the gradient
					let ourGradient = 'linear(to-r, ';
					result.types.map((t) => (ourGradient += currentColors[t.type.name] + ','));
					ourGradient = ourGradient.slice(0, -1) + ')';
					setTypeGradient(ourGradient);

					//setting the pokemon in context
					let ourPokemon = {
						weight: result.weight / 10,
						height: result.height / 10,
						name: result.name,
						types: result.types,
						stats: result.stats,
						moves: result.moves,
						id: result.id,
						abilities: result.abilities
					};
					setPokeDP(result.sprites.other['official-artwork'].front_default);
					setPokemon(ourPokemon);
					setLoading(false);
				})
				.catch((error) => {
					console.error('There has been a problem with your fetch operation:', error);
				});
		},
		[ currentColors ]
	);

	return (
		<Flex
			w={[ '100vw', 'xl', 'xl', 'xl' ]}
			borderColor={typeColor}
			borderWidth={2}
			borderBottomWidth={0}
			flexDirection="column"
			alignItems="center"
			flex={12}
			mt={2}
			p={2}
		>
			<Heading bgGradient={typeGradient} bgClip={pokemon.types.length == 1 ? '' : 'text'} textColor={typeColor}>
				{cGetPokemonName().toUpperCase()}
			</Heading>
			<Container display="flex" justifyContent="space-between" flexDirection={[ 'column', 'row' ]} pt={2} pb={2}>
				<Image
					alignSelf="center"
					fallbackSrc={placeholder}
					boxSize={[ '150px', '150px', '200px', '200px' ]}
					src={pokeDP}
				/>

				{isLoading ? (
					<Spinner />
				) : (
					<Container>
						<SimpleGrid spacingX={6} spacingY={2} columns={[ 2, 2, 2, 2 ]} p={2}>
							<Stat>
								<StatLabel>HP</StatLabel>
								<StatNumber>{pokemon.stats[0].base_stat}</StatNumber>
								<Progress
									value={pokemon.stats[0].base_stat * 0.666}
									size="sm"
									colorScheme={themeColors[pokemon.types[0].type.name]}
								/>
							</Stat>
							<Stat>
								<StatLabel>Speed</StatLabel>
								<StatNumber>{pokemon.stats[5].base_stat}</StatNumber>
								<Progress
									value={pokemon.stats[5].base_stat * 0.666}
									size="sm"
									colorScheme={themeColors[pokemon.types[0].type.name]}
								/>
							</Stat>
							<Stat>
								<StatLabel>Attack</StatLabel>
								<StatNumber>{pokemon.stats[1].base_stat}</StatNumber>
								<Progress
									value={pokemon.stats[1].base_stat * 0.666}
									size="sm"
									colorScheme={themeColors[pokemon.types[0].type.name]}
								/>
							</Stat>
							<Stat>
								<StatLabel>Defense</StatLabel>
								<StatNumber>{pokemon.stats[2].base_stat}</StatNumber>
								<Progress
									value={pokemon.stats[2].base_stat * 0.666}
									size="sm"
									colorScheme={themeColors[pokemon.types[0].type.name]}
								/>
							</Stat>
							<Stat>
								<StatLabel>Sp. Attack</StatLabel>
								<StatNumber>{pokemon.stats[3].base_stat}</StatNumber>
								<Progress
									value={pokemon.stats[3].base_stat * 0.666}
									size="sm"
									colorScheme={themeColors[pokemon.types[0].type.name]}
								/>
							</Stat>
							<Stat>
								<StatLabel>Sp.Defense</StatLabel>
								<StatNumber>{pokemon.stats[4].base_stat}</StatNumber>
								<Progress
									value={pokemon.stats[4].base_stat * 0.666}
									size="sm"
									colorScheme={themeColors[pokemon.types[0].type.name]}
								/>
							</Stat>
						</SimpleGrid>
					</Container>
				)}
			</Container>
			<Divider m={4} />
			<Heading>Profile</Heading>
		</Flex>
	);
};

export default PokeDetailsPage;
