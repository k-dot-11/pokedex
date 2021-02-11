import { Flex, Heading, list, List, ListItem, Grid, GridItem, Spinner, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ListBox from '../components/ListBox';

const ListOfAllPokemons = () => {
	const [ listItems, setListItems ] = useState([]);
	const [ isFetching, setIsFetching ] = useState(false);
	const [ offset, setOffset ] = useState(0);

	useEffect(() => {
		fetch('https://pokeapi.co/api/v2/pokemon/?limit=40&offset=' + offset)
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				console.log(result);
				setListItems([ ...listItems, ...result.results ]);
				setOffset(offset + 40);
			});
	}, []);

	useEffect(
		() => {
			if (!isFetching) return;
			fetchMoreListItems();
		},
		[ isFetching ]
	);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleScroll = () => {
		if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
		setIsFetching(true);
		console.log('Fetch more list items!');
	};

	const fetchMoreListItems = () => {
		setTimeout(() => {
			fetch('https://pokeapi.co/api/v2/pokemon/?limit=40&offset=' + offset)
				.then((res) => {
					return res.json();
				})
				.then((result) => {
					console.log(result);
					setListItems([ ...listItems, ...result.results ]);
					setOffset(offset + 40);
					setIsFetching(false);
				});
		}, 1000);
	};

	return (
		<Flex p={5} justify="center" overflow="hidden">
			<SimpleGrid columns={[2, 2 ,3 , 4]}  gap={[2,3,5,9]}>
				{listItems.map((listItem) => (
					<GridItem py={5}>
						<ListBox url={listItem.url} name={listItem.name} />
					</GridItem>
				))}
			</SimpleGrid>
			{isFetching && <Spinner justifySelf="center" position="fixed" bottom={0} right="50vw" />}
		</Flex>
	);
};

export default ListOfAllPokemons;
