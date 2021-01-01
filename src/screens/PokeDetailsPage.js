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
	Spinner,
	Button,
	Tag,
	TagLabel,
	HStack,
	Box
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import placeholder from '../assets/placeholder.png';
import { PokemonContext } from '../context/PokemonContext';
import { darkColors, colors, themeColors, lightColors } from '../colors/TypeColors';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import NewEvolutionChain from '../components/NewEvolutionChain';

const PokeDetailsPage = (props) => {
	const { pokemonName, cGetPokemonName } = useContext(PokemonContext);

	const currentColors = useColorModeValue(colors, darkColors);

	const [ isLoading, setLoading ] = useState(true);
	const [ typeColor, setTypeColor ] = useState(theme.colors.current);
	const [ typeGradient, setTypeGradient ] = useState('');

	const MotionFlex = motion.custom(Flex);
	const MotionTag = motion.custom(Tag);

	const [ pokemon, setPokemon ] = useState({
		weight: '',
		height: '',
		name: '',
		types: [],
		stats: [],
		id: '',
		moves: [],
		abilities: [],
		baseExperience: ''
	});

	const [ pokeSpeciesDetails, setPokeSpeciesDetails ] = useState({
		baseHappiness: '',
		captureRate: '',
		color: '',
		eggGroups: [],
		evoultionChainURL: '',
		evolvesFrom: '',
		pokemonGenus: '',
		habitat: '',
		growthRate: '',
		generation: '',
		varieties: [],
		flavorText: ''
	});

	const [ pokeDP, setPokeDP ] = useState('');

	useEffect(
		() => {
			fetch('https://pokeapi.co/api/v2/pokemon/' + (cGetPokemonName() || pokemonName))
				.then((res) => {
					if (res.status === 200) {
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
						abilities: result.abilities,
						baseExperience: result.base_experience
					};
					setPokeDP(result.sprites.other['official-artwork'].front_default);
					setPokemon(ourPokemon);
					fetch('https://pokeapi.co/api/v2/pokemon-species/' + result.id)
						.then((res) => res.json())
						.then((result) => {
							let newPokeSpecies = {
								baseHappiness: result.base_happiness,
								captureRate: result.capture_rate,
								color: result.color.name,
								eggGroups: result.egg_groups,
								evoultionChainURL: result.evolution_chain.url,
								evolvesFrom: result.evolves_from_species ? result.evolves_from_species.name : '',
								pokemonGenus: result.genera[7].genus,
								habitat: result.habitat.name,
								growthRate: result.growth_rate.name,
								generation: result.generation.name,
								varieties: result.varieties,
								flavorText: result.flavor_text_entries[5].flavor_text
							};
							setPokeSpeciesDetails(newPokeSpecies);
						})
						.then(() => {
							setLoading(false);
						});
				})
				.catch((error) => {
					console.error('There has been a problem with your fetch operation:', error);
				});
		},
		[ currentColors , pokemonName ]
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
			height="100vh"
		>
			<Heading
				m={3}
				bgGradient={typeGradient}
				bgClip={pokemon.types.length == 1 ? '' : 'text'}
				textColor={typeColor}
			>
				{cGetPokemonName().toUpperCase()}
			</Heading>
			{isLoading ? (
				<Spinner />
			) : (
				<HStack spacing={4} mb={3} mt={3}>
					{pokemon.types.map((size) => (
						<Link>
							<MotionTag
								whileHover={{ scale: 1.1 }}
								colorScheme={themeColors[size.type.name]}
								variant="subtle"
								size="lg"
								shadow="md"
							>
								<TagLabel>{size.type.name}</TagLabel>
							</MotionTag>
						</Link>
					))}
					<Link>
						<MotionTag
							whileHover={{ scale: 1.1 }}
							variant="subtle"
							size="lg"
							shadow="md"
							colorScheme={themeColors[pokemon.types[0].type.name]}
						>
							<TagLabel>{pokeSpeciesDetails.pokemonGenus}</TagLabel>
						</MotionTag>
					</Link>
				</HStack>
			)}

			<Container display="flex" justifyContent="space-between" flexDirection={[ 'column', 'row' ]} pt={2} pb={2}>
				<Image
					alignSelf="center"
					fallbackSrc={placeholder}
					boxSize={[ '150px', '150px', '200px', '200px' ]}
					src={pokeDP}
				/>

				{isLoading ? (
					<Spinner alignSelf="center" />
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
									borderRadius={50}
								/>
							</Stat>
							<Stat>
								<StatLabel>Speed</StatLabel>
								<StatNumber>{pokemon.stats[5].base_stat}</StatNumber>
								<Progress
									value={pokemon.stats[5].base_stat * 0.666}
									size="sm"
									borderRadius={50}
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
									borderRadius={50}
								/>
							</Stat>
							<Stat>
								<StatLabel>Defense</StatLabel>
								<StatNumber>{pokemon.stats[2].base_stat}</StatNumber>
								<Progress
									value={pokemon.stats[2].base_stat * 0.666}
									size="sm"
									colorScheme={themeColors[pokemon.types[0].type.name]}
									borderRadius={50}
								/>
							</Stat>
							<Stat>
								<StatLabel>Sp. Attack</StatLabel>
								<StatNumber>{pokemon.stats[3].base_stat}</StatNumber>
								<Progress
									value={pokemon.stats[3].base_stat * 0.666}
									size="sm"
									colorScheme={themeColors[pokemon.types[0].type.name]}
									borderRadius={50}
								/>
							</Stat>
							<Stat>
								<StatLabel>Sp.Defense</StatLabel>
								<StatNumber>{pokemon.stats[4].base_stat}</StatNumber>
								<Progress
									value={pokemon.stats[4].base_stat * 0.666}
									size="sm"
									colorScheme={themeColors[pokemon.types[0].type.name]}
									borderRadius={50}
								/>
							</Stat>
						</SimpleGrid>
					</Container>
				)}
			</Container>
			<Box textAlign="center" p={3}>
				<Text size="sm" fontStyle="italic" m={2} textAlign="center">
					{pokeSpeciesDetails.flavorText}
				</Text>
			</Box>
			{/* <Divider m={2} />

			<Heading>Profile</Heading>

			<Divider m={2} /> */}

			{isLoading ? (
				<Spinner />
			) : (
				<Container>
					<Container>
						<SimpleGrid columns={[ 2, 3, 3, 3 ]} display="flex" justifyContent="space-between" mt={2}>
							<Stat align="center">
								<StatLabel>No.</StatLabel>
								<StatNumber>{'# ' + pokemon.id}</StatNumber>
							</Stat>
							<Stat align="center">
								<StatLabel>Height</StatLabel>
								<StatNumber>{pokemon.height + ' m'}</StatNumber>
							</Stat>
							<Stat align="center">
								<StatLabel>Weight</StatLabel>
								<StatNumber>{pokemon.weight + ' kg'}</StatNumber>
							</Stat>
						</SimpleGrid>
						<br />
						<SimpleGrid columns={[ 2, 3, 3, 3 ]} display="flex" justifyContent="space-between" mt={2}>
							<Stat align="center">
								<StatLabel>Capture Rate</StatLabel>
								<StatNumber>{pokeSpeciesDetails.captureRate}</StatNumber>
							</Stat>
							<Stat align="center">
								<StatLabel>Base Happiness</StatLabel>
								<StatNumber>{pokeSpeciesDetails.baseHappiness}</StatNumber>
							</Stat>
							<Stat align="center">
								<StatLabel>Base Experience</StatLabel>
								<StatNumber>{pokemon.baseExperience}</StatNumber>
							</Stat>
						</SimpleGrid>
					</Container>
					<Divider m={3} />
					<Heading size="md" textAlign="center" fontWeight="none" mb={4}>
						Evolution Chain
					</Heading>
					<NewEvolutionChain url={pokeSpeciesDetails.evoultionChainURL} pokedetails={pokemon} />
				</Container>
			)}
		</Flex>
	);
};

export default PokeDetailsPage;
