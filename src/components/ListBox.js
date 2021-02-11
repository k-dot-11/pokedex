import { Flex, Heading, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import placeholder from '../assets/placeholder.png';

const ListBox = (props) => {
	const [ pokeDP, setPokeDP ] = useState('');
	const [ isLoading, setIsLoading ] = useState(true);

    const MotionFlex = motion.custom(Flex)

	useEffect(() => {
		fetch(props.url)
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				setPokeDP(result.sprites.other['official-artwork'].front_default);
			});
	}, []);

	return (
		<Flex whileHover={{ scale: 1.1 }} flexDirection="column" justify='center' align = 'center' p={5}>
			<Heading size="md">{props.name.toString().toUpperCase()}</Heading>
			<Image fallbackSrc={placeholder} boxSize="125px" src={pokeDP} />
		</Flex>
	);
};

export default ListBox;
