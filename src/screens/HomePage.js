import {
	Box,
	Button,
	ButtonGroup,
	Flex,
	Heading,
	IconButton,
	Image,
	Input,
	SkeletonCircle,
	SkeletonText,
	Text,
	useDisclosure
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton
} from '@chakra-ui/react';
import PokemonDetailsBox from '../components/PokemonDetailsBox';
import { Link } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { FaGithub, FaGithubSquare, FaLinkedin, FaOptinMonster, FaRedditSquare } from 'react-icons/fa';
import { PokemonContext } from '../context/PokemonContext';

const HomePage = () => {
	const [ pokemon, setPokemon ] = useState('');
	const [ isLoading, setIsLoading ] = useState(false);
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [ pokemonDetails, setPokemonDetails ] = useState({
		weight: '',
		height: '',
		name: '',
		types: [],
		stats: [],
		moves: [],
		abilities: []
	});
	const [ pokeDP, setPokeDP ] = useState('https://www.flaticon.com/svg/static/icons/svg/188/188918.svg');

	const { pokemonName, cSetPokemonName } = useContext(PokemonContext);

	const searchForPokemon = () => {
		setIsLoading(true);
		fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon)
			.then((res) => {
				if (res.status === 200) {
					console.log('Pokemon was found');
					onOpen();
					return res.json();
				} else if (res.status === 404) {
					console.log('pokemon not found');
					toast({
						title: "Couldn't find the pokemon",
						description: 'Maybe take a look at the list of all pokemons',
						status: 'error',
						duration: 5000,
						isClosable: true
					});
				} else {
					toast({
						title: 'Error',
						description: 'An unknown error occured :/',
						status: 'error',
						duration: 4000,
						isClosable: true
					});
				}
			})
			.then((result) => {
				console.log(result);
				setPokeDP(result.sprites.other['official-artwork'].front_default);
				cSetPokemonName(result.name);
				const newPokemon = {
					weight: result.weight / 10,
					height: result.height / 10,
					name: result.name,
					types: result.types,
					stats: result.stats,
					moves: result.moves,
					id: result.id,
					abilities: result.abilities
				};
				setPokemonDetails(newPokemon);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				console.error('There has been a problem with your fetch operation:', error);
			});
	};
	const MotionIconButton = motion.custom(IconButton);

	return (
		<Flex flexDirection="column" alignItems="center" justify={['start' , 'start','center' , 'center']} flex={12} mt={[4,4,0,0]}>
			<br/>
			<br/>
			<br/>
			<br/>
			<Image
				blockSize={[ '200px', '300px', '300px', '300px' ]}
				src="https://www.pngkey.com/png/full/222-2222875_pokedex-icon.png"
			/>
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{'# ' + pokemonDetails.id}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{isLoading ? (
							<Flex padding="6" boxShadow="lg">
								<SkeletonCircle size="10" />
								<SkeletonText mt="4" noOfLines={4} spacing="4" />
							</Flex>
						) : (
							<PokemonDetailsBox pokeDP={pokeDP} pokemonDetails={pokemonDetails} />
						)}
					</ModalBody>

					<ModalFooter>
						<Button variant="ghost" mr={3} onClick={onClose}>
							Close
						</Button>
						<Link to={{ pathname: '/pokedetails', pokemonDetails: pokemonDetails }}>
							<Button variant="ghost" colorScheme="blue">
								Details
							</Button>
						</Link>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<br />
			<br />
			<Flex w={[ '80vw', '70vw', '40vw', '20vw' ]}>
				<Input
					autoFocus
					value={pokemon}
					onChange={(input) => {
						setPokemon(input.target.value.toString().toLowerCase());
					}}
					variant="filled"
					placeholder="Search for a pokemon"
					flex="4"
					type="text"
					onKeyPress={(event) => {
						if (event.key == 'Enter') {
							searchForPokemon();
						}
					}}
				/>
				<MotionIconButton
					type="submit"
					colorScheme="red"
					aria-label="Search database"
					icon={<FaSearch />}
					isLoading = {isLoading}
					flex="1"
					ml="10px"
					isRound
					whileHover={{ scale: 1.05 }}
					onClick={searchForPokemon}
					whileTap={{ scale: 0.8 }}
				/>
			</Flex>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<Flex flexDirection="column" align="center" justifyContent="center" >
				<Flex w={[ '50vw', '40vw', '25vw', '10vw' ]} justify="space-around">
					<IconButton size="sm" as={FaRedditSquare} />
					<IconButton size="sm" as={FaGithubSquare} />
					<IconButton size="sm" as={FaLinkedin} />
				</Flex>
				<br />
				<Text fontSize={12}>An open-source site by Bugdroid2K with help from Pokeapi</Text>
				<br />
				<Text fontSize={10}>All content is © Nintendo, Game Freak, and The Pokémon Company.</Text>
			</Flex>
		</Flex>
	);
};

export default HomePage;
