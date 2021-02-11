import { Button, Container } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const DamageRelation = (props) => {
	const [ moreDamageTo, setMoreDamageTo ] = useState(new Map());
	const [ lessDamageTo, setLessDamageTo ] = useState(new Map());
	const [ lessDamageFrom, setLessDamageFrom ] = useState(new Map());
	const [ moreDamageFrom, setMoreDamageFrom ] = useState(new Map());

	const addToMoreDamageMap = (damageRelations) => {
		let ourMap = new Map([ ...moreDamageTo ]);
		console.log(ourMap);

		damageRelations.double_damage_to.map((type) => {
			if (moreDamageTo.has(type.name)) {
				let newMulti = 2 * moreDamageTo.get(type.name).multi;
				ourMap.set(type.name, { multi: newMulti });
			} else if (lessDamageTo.has(type.name)) {
				if (lessDamageTo.get(type.name).multi == 2) {
					lessDamageTo.delete(type.name);
				} else {
					let newMulti = 2 * lessDamageTo.get(type.name).multi;
					lessDamageTo.set(type.name, { multi: newMulti });
				}
			} else {
				ourMap.set(type.name, { multi: 2 });
			}
		});
		setMoreDamageTo(ourMap);
	};

	const addToLessDamageMap = (damageRelations) => {
		let ourMap = new Map([ ...lessDamageTo ]);
		console.log(ourMap);

		damageRelations.half_damage_to.map((type) => {
			if (ourMap.has(type.name)) {
				let newMulti = 0.5 * ourMap.get(type.name).multi;
				ourMap.set(type.name, { multi: newMulti });
			} else if (moreDamageTo.has(type.name)) {
				if (moreDamageTo.get(type.name).multi == 2) {
					moreDamageTo.delete(type.name);
				} else {
					let newMulti = 0.5 * moreDamageTo.get(type.name).multi;
					moreDamageTo.set(type.name, { multi: newMulti });
				}
			} else {
				ourMap.set(type.name, { multi: 0.5 });
			}
		});
		setLessDamageTo(ourMap);
	};

	useEffect(() => {
		props.types.map((ourType) => {
			fetch('https://pokeapi.co/api/v2/type/' + ourType.type.name)
				.then((res) => {
					return res.json();
				})
				.then((result) => {
					console.log(result);
					addToMoreDamageMap(result.damage_relations);
					addToLessDamageMap(result.damage_relations);
				});
		});
	}, []);

	return (
		<Container>
			<Button
				onClick={() => {
					console.log(moreDamageTo);
					console.log(lessDamageTo);
				}}
			>
				fad
			</Button>
		</Container>
	);
};

export default DamageRelation;
