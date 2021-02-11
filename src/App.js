import React from 'react';
import {
	ChakraProvider,
	theme,
	Flex,
	Image,
	Heading,
	Box,
	Button,
	useDisclosure,
	Text,
	IconButton,
	Avatar,
	Container
} from '@chakra-ui/react';
import { MdClose, MdMenu } from 'react-icons/md';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HomePage from './screens/HomePage';
import PokeDetailsPage from './screens/PokeDetailsPage';
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton
} from '@chakra-ui/react';
import logo from './assets/navi.jpg';
import { FaGithub, FaGithubSquare, FaLinkedin, FaOptinMonster, FaRedditSquare } from 'react-icons/fa';
import PokemonContextProvider from './context/PokemonContext';
import ListOfAllPokemons from './screens/ListOfAllPokemons';

function App() {
	const [ show, toggleShow ] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const MotionHeading = motion.custom(Heading);
	const MotionFlex = motion.custom(Flex);

	return (
		<ChakraProvider theme={theme}>
			<PokemonContextProvider>
				<Router>
					<Flex
					overflowX='hidden'
						display="flex"
						justify="center"
						align="center"
						flexDirection="column"
					>
						<Drawer size="xl" isOpen={isOpen} placement="top" onClose={onClose} >
							<DrawerOverlay>
								<DrawerContent borderBottomRadius="5vw">
									<DrawerCloseButton />
									<DrawerHeader textAlign="center">Pokedoxx</DrawerHeader>

									<DrawerBody>
										<Flex align="center" justify="center" flexDirection="column">
											<Link to="/listofall" _hover="none">
												<MotionHeading whileHover={{ opacity: 0.5 }} p={4} fontSize="lg">
													List of All Pokemons
												</MotionHeading>
											</Link>
											<Link to="/battle" _hover="none">
												<MotionHeading whileHover={{ opacity: 0.5 }} p={4} fontSize="lg">
													Battle
												</MotionHeading>
											</Link>
											<Link to="/about" _hover="none">
												<MotionHeading whileHover={{ opacity: 0.5 }} p={4} fontSize="lg">
													About
												</MotionHeading>
											</Link>
										</Flex>
									</DrawerBody>
									
								</DrawerContent>
							</DrawerOverlay>
						</Drawer>
						<Flex
							justifySelf="flex-start"
							alignItems="center"
							alignSelf="flex-start"
							justifyContent="space-between"
							width="100vw"
							flex={1}
							paddingInline="20vw"
							flexDirection={{ base: 'column', md: 'row' }}
							shadow="lg"
						>
							<Flex align="center" justifyContent="space-between" w="100vw" p={3}>
								<Link to="/home" _hover="none">
									<MotionFlex whileHover={{ rotate: [ 0, -5, 5, -5, 0 ], opacity: 0.5 }} align="center">
											<Avatar src={logo} marginInline={2} />

										<MotionHeading >
											Pokedoxx
										</MotionHeading>
									</MotionFlex>
								</Link>
								<Flex align="center">
									<ColorModeSwitcher />
									<Box marginInline={4} display={{ base: 'block', md: 'none' }} onClick={onOpen}>
										{show ? <MdClose /> : <MdMenu />}
									</Box>
								</Flex>
							</Flex>
							<Flex
								align="center"
								justify="center"
								display={{ base: show ? 'block' : 'none', md: 'flex' }}
							>
								<Link to="/listofall" _hover="none">
									<MotionHeading whileHover={{ opacity: 0.5 }} p={4} fontSize="lg">
										List of All Pokemons
									</MotionHeading>
								</Link>
								<Link to="/pokedetails" _hover="none">
									<MotionHeading whileHover={{ opacity: 0.5 }} p={4} fontSize="lg">
										Battle
									</MotionHeading>
								</Link>
								<Link to="/about" _hover="none">
									<MotionHeading whileHover={{ opacity: 0.5 }} p={4} fontSize="lg">
										About
									</MotionHeading>
								</Link>
							</Flex>
						</Flex>
						<Switch>
							<Route path="/battle">
								<HomePage />
							</Route>
							<Route path="/listofall">
								<ListOfAllPokemons />
							</Route>
							<Route path="/pokedetails">
								<PokeDetailsPage />
							</Route>
							<Route path="/">
								<HomePage />
							</Route>
						</Switch>
						
					</Flex>
				</Router>
			</PokemonContextProvider>
		</ChakraProvider>
	);
}

export default App;
