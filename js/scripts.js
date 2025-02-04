let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Pikachu", types: ["electric"], height: 45 },
    { name: "Mewtwo", types: ["psychic"], height: 165 },
    { name: "Kicklee", types: ["fighting"], height: 140 },
    { name: "Charizard", types: ["fire", "flying"], height: 175 },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListItem(pokemon) {
    const pokemonListElement = document.querySelector('.pokemon-list');
    const listItem = document.createElement('li');
    const button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');

    button.addEventListener('click', () => showDetails(pokemon)); 

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
  }

  function showDetails(pokemon) {
    console.log(pokemon); 
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});