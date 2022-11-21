const pokeapi = {}
const pokedata = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.pkm_number = pokeDetail.id
    pokemon.pkm_name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.pkm_types = types
    pokemon.pkm_type = type
    pokemon.pkm_image = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function createPokemonData(pokeDetail){
    const selectedPokemon = new Pokemon()
    
    selectedPokemon.pkm_number = pokeDetail.id
    selectedPokemon.pkm_name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    selectedPokemon.pkm_types = types
    selectedPokemon.pkm_type = type
    selectedPokemon.pkm_image = pokeDetail.sprites.other.dream_world.front_default
    selectedPokemon.pkm_height = pokeDetail.height
    selectedPokemon.pkm_weight = pokeDetail.weight


    return selectedPokemon
    
}

pokeapi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json()).then(convertPokeApiDetailToPokemon)
}

pokeapi.getPokemons = async (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return await fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeapi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

const selectPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    return await fetch(url)
        .then((response) => response.json())
        .then(createPokemonData).then((pokemon) => displayPopup(pokemon))
}


