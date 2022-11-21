const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 251;
const limit = 20;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => `
            <li onclick="selectPokemon(${pokemon.pkm_number})" class="pokemon ${pokemon.pkm_type}">
                <span class="number">#${pokemon.pkm_number}</span>
                <span class="name">${pokemon.pkm_name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.pkm_types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                    </ol>
                    <img src="${pokemon.pkm_image}" alt="${pokemon.name}">
                </div>
            </li>
        `).join("")
    }).catch((error) => console.error(error))
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsNextPage = offset+limit
    if(qtdRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
});

const displayPopup = (pokemon) => {
    console.log(pokemon)
    const htmlString = `
        <div class="popup">
            <button id="closeBtn" onclick="closePopup()">X</button>
            <div class="pokemon ${pokemon.pkm_type}">
            <img src="${pokemon.pkm_image}" alt="${pokemon.pkm_name}">
            <ol>            
                <p>Height: ${pokemon.pkm_height}</p>
                <p>Weight: ${pokemon.pkm_weight}</p>
                <p>Type: ${pokemon.pkm_types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}</p>
            </ol>
            </div>
        </div>
    `
    pokemonList.innerHTML = htmlString + pokemonList.innerHTML
}

const closePopup = () => {
    const popup = document.querySelector('.popup')
    popup.parentElement.removeChild(popup);
}