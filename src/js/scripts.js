document.addEventListener('DOMContentLoaded', function() {
  let pokemonRepository = (function () {
      let pokemonList =;
      let filteredPokemonList =; // For search functionality

      function getAll() {
          return filteredPokemonList.length > 0 ? filteredPokemonList : pokemonList;
      }

      function add(pokemon) {
          pokemonList.push(pokemon);
      }

      function addListItem(pokemon) {
          const pokemonGrid = document.querySelector(".pokemon-grid");
          const pokemonItem = document.createElement("div");
          pokemonItem.classList.add("pokemon-item");

          const button = document.createElement("button");
          button.innerText = pokemon.name;
          button.classList.add("pokemon-button", "btn", "btn-primary");
          button.setAttribute("data-toggle", "modal");
          button.setAttribute("data-target", "#pokemonModal");

          button.addEventListener("click", () => {
              showDetails(pokemon);
          });

          pokemonItem.appendChild(button);
          pokemonGrid.appendChild(pokemonItem);
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
                  displayPokemonList(getAll()); // Display all Pokemon initially
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
              })
              .catch((error) => {
                  console.error(error);
              });
      }

      function showDetails(pokemon) {
          loadDetails(pokemon).then(() => {
              showModal(pokemon);
          });
      }

      function showModal(pokemon) {
          $("#pokemonModalLabel").text(`#${pokemon.name}`);
          $("#pokemonModalImage").attr("src", pokemon.imageUrl);
          $("#pokemonModalHeight").text(`Height: ${pokemon.height}`);

          $("#pokemonModal").modal("show");
      }

      // Search functionality
      const searchInput = document.getElementById('search-input');
      searchInput.addEventListener('input', () => {
          const searchTerm = searchInput.value.toLowerCase();
          filteredPokemonList = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
          displayPokemonList(getAll());
      });

      // Display the list of Pokemon
      function displayPokemonList(pokemonList) {
          const pokemonGrid = document.querySelector(".pokemon-grid");
          pokemonGrid.innerHTML = ''; // Clear existing items

          pokemonList.forEach(pokemon => {
              addListItem(pokemon);
          });
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

  pokemonRepository.loadList();
});