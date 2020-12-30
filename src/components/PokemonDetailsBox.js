import {
	Box,
	Button,
	Container,
	Divider,
	Flex,
	Heading,
	HStack,
	Image,
	Progress,
	SimpleGrid,
	Stat,
	StatLabel,
	StatNumber,
	Tag,
	TagLabel,
	Text
} from '@chakra-ui/react';
import React from 'react';
import placeholder from '../assets/placeholder.png';
import { colors, themeColors } from '../colors/TypeColors';


const PokemonDetailsBox = (props) => {
	let pokeAbs = '';
	var i = 0;
	for (i = 0; i < 3 && i < props.pokemonDetails.abilities.length; ++i) {
		pokeAbs +=
			props.pokemonDetails.abilities[i].ability.name +
			(i === 2 || i === props.pokemonDetails.abilities.length - 1 ? '' : ', ');
	}

	const typeGradient = () => {
		let ourGradient = 'linear(to-r, ';
		props.pokemonDetails.types.map((t) => (ourGradient += colors[t.type.name] + ','));
		ourGradient = ourGradient.slice(0, -1) + ')';
		return ourGradient;
	};

	return (
		<Flex flexDirection="column" align="center">
			<Heading
				color={colors[props.pokemonDetails.types[0].type.name]}
				bgGradient={typeGradient()}
				bgClip={props.pokemonDetails.types.length === 1 ? '' : 'text'}
				fontWeight="extrabold"
			>
				{props.pokemonDetails.name.toUpperCase()}
			</Heading>
			<Divider m={2} />
			<HStack spacing={4} mb={3}>
				{props.pokemonDetails.types.map((size) => (
					<Tag variant="subtle" size="lg">
						<TagLabel style={{ color: colors[size.type.name] }}>{size.type.name}</TagLabel>
					</Tag>
				))}
			</HStack>
			<Container pos="relative" borderColor="teal" display="flex" justifyContent="space-around">
				<Image fallbackSrc={placeholder} boxSize="125px" src={props.pokeDP} />

				<SimpleGrid marginInline={3} columns={2} spacing={5} alignItems="center">
					<Stat>
						<StatLabel>HP</StatLabel>
						<StatNumber>{props.pokemonDetails.stats[0].base_stat}</StatNumber>
						<Progress
							value={props.pokemonDetails.stats[0].base_stat * 0.66666}
							size="xs"
							colorScheme={themeColors[props.pokemonDetails.types[0].type.name]}
						/>
					</Stat>

					<Stat>
						<StatLabel>Height</StatLabel>
						<StatNumber>{props.pokemonDetails.height + ' m'}</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>Attack</StatLabel>
						<StatNumber>{props.pokemonDetails.stats[1].base_stat}</StatNumber>
						<Progress
							value={props.pokemonDetails.stats[1].base_stat * 0.66666}
							size="xs"
							colorScheme={themeColors[props.pokemonDetails.types[0].type.name]}
						/>
					</Stat>
					<Stat>
						<StatLabel>Weight</StatLabel>
						<StatNumber>{props.pokemonDetails.weight + ' kg'}</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>Defense</StatLabel>
						<StatNumber>{props.pokemonDetails.stats[2].base_stat}</StatNumber>
						<Progress
							value={props.pokemonDetails.stats[2].base_stat * 0.66666}
							size="xs"
							colorScheme={themeColors[props.pokemonDetails.types[0].type.name]}
						/>
					</Stat>
					<Stat>
						<StatLabel>No.</StatLabel>
						<StatNumber>{'#' + props.pokemonDetails.id}</StatNumber>
					</Stat>
				</SimpleGrid>
			</Container>
			<Heading size="sm" textAlign="justify" noOfLines={1} marginTop={5}>
				{'Abilities : ' + pokeAbs}
			</Heading>
		</Flex>
	);
};

export default PokemonDetailsBox;
