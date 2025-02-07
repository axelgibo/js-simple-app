let pokemonRepository = (function () {
  let pokemonList = [];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListItem(pokemon) {
    const pokemonListElement = document.querySelector(".pokemon-list");
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");

    button.addEventListener("click", () => showDetails(pokemon));

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
  }

  function loadList() {
    const url = "https://pokeapi.co/api/v2/pokemon/?limit=151";
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          add({
            name: item.name,
            detailsUrl: item.url,
          });
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    const url = item.detailsUrl;
    return fetch(url)
      .then((response) => response.json())
      .then((details) => {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(() => {
      console.log(pokemon);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
