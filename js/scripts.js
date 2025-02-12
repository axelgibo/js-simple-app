let pokemonRepository = (function () {
  let pokemonList = [];

  // Retrieves all Pokémon in the list
  function getAll() {
    return pokemonList;
  }

  // Adds a single Pokémon to the list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // Creates a list item for a single Pokémon
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

  // Loads the initial list of Pokémon from the API
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

  // Loads detailed information for a single Pokémon
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
      showModal(`#${pokemon.name}`, `Height: ${pokemon.height}`, pokemon);
    });
  }

  function showModal(title, text, pokemon) {
    let modalContainer = document.querySelector("#modal-container");

    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = title;

    let contentElement = document.createElement("p");
    contentElement.innerText = text;

    let imageElement = document.createElement("img");
    imageElement.src = pokemon.imageUrl;
    imageElement.alt = `${pokemon.name} image`;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(contentElement);

    modalContainer.innerHTML = "";
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }

  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

// Load Pokémon and create buttons
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// Close modal when clicking outside of it
document.querySelector("#modal-container").addEventListener("click", (event) => {
  console.log("Clicked outside modal"); // Debugging
  if (!event.target.closest(".modal")) {
    pokemonRepository.hideModal();
  }
});

// Close modal when pressing ESC
document.addEventListener("keydown", (event) => {
  console.log("Key pressed:", event.key); // Debugging
  if (event.key === "Escape") {
    pokemonRepository.hideModal();
  }
});
