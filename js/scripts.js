let pokemonList = [
    { name: "Pikachu", types: ["electric"], height: 45 },
    { name: "Mewtwo", types: ["psychic"], height: 165 },
    { name: "Kicklee", types: ["fighting"], height: 140 },
    { name: 'Charizard', types: ['fire', 'flying'], height: 175 },
];

// Loop through the Pokémon array
for (let i = 0; i < pokemonList.length; i++) {
    let pokemon = pokemonList[i];

    document.write('<div class="pokemon-card">');

    document.write("<h2>" + pokemon.name + " (type: " + pokemon.types.join(", ") + ")</h2>");
    document.write("<p>Height: " + pokemon.height + "</p>");

    if (pokemon.height > 170) {
        document.write("<p>Wow, that's big!</p>");
    }

    document.write('</div>');
}