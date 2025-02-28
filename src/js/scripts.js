let pokemonRepository = (function () {
  let pokemonList = [];
  let filteredPokemonList = [];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListItem(pokemon) {
    const pokemonListElement = document.querySelector(".pokemon-list");
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");

    const button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button", "btn", "btn-primary");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");

    button.addEventListener("click", () => {
      console.log("Button clicked for:", pokemon.name);
      showDetails(pokemon);
    });

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
  }

  function loadList() {
    const url = "https://pokeapi.co/api/v2/pokemon/?limit=151";
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((item) => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch((e) => {
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
        console.log("Details loaded for:", item.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function showDetails(pokemon) {
    console.log("showDetails called for:", pokemon.name);
    loadDetails(pokemon).then(() => {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    console.log("showModal called for:", pokemon.name);

    $("#pokemonModalLabel").text(`#${pokemon.name}`);
    $("#pokemonModalImage").attr("src", pokemon.imageUrl);
    $("#pokemonModalHeight").text(`Height: ${pokemon.height}`);

    $("#pokemonModal").modal("show");
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();

// Load Pokémon and create buttons
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
