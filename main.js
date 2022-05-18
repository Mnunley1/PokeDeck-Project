// Add your javascript here
const pokemonCards = document.getElementById('pokemonList');

const getPokemon = () => {
	const promises = [];
	for (let i = 1; i <= 151; i++) {
		const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
		promises.push(fetch(url).then((res) => res.json()));
	}
	Promise.all(promises).then((results) => {
		const pokemon = results.map((result) => ({
			id: result.id,
			name: result.name,
			image: result.sprites['front_default'],
			height: result.height,
			weight: result.weight,
			moves: result.moves.map((move) => move.move.name).join(', '),
			type: result.types.map((type) => type.type.name).join(', '),
		}));
		renderPokemon(pokemon);
	});
};

const renderPokemon = (pokemon) => {
	console.log(pokemon);
	const string = pokemon
		.map(
			(pokemon) => `
        <li class="card">
            <img class="card-image" src="${pokemon.image}"/>
            <h2 class="card-header">${pokemon.name}</h2>
            <h4 class="sub-header">${pokemon.id}</h4>
            <button>Stats</button>
        </l1>
        `
		)
		.join('');
	pokemonCards.innerHTML = string;
};

getPokemon();
