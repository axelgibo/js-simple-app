let pokemonList = [
  { name: "Pikachu", types: ["electric"], height: 45 },
  { name: "Mewtwo", types: ["psychic"], height: 165 },
  { name: "Kicklee", types: ["fighting"], height: 140 },
  { name: "Charizard", types: ["fire", "flying"], height: 175 },
];

// printArrayDetails function declaration
function printArrayDetails(list) {
  list.forEach(function (pokemon) {
    document.write('<div class="pokemon-card">');

    document.write(
      "<h2>" + pokemon.name + " (type: " + pokemon.types.join(", ") + ")</h2>"
    );
    document.write("<p>Height: " + pokemon.height + "</p>");

    if (pokemon.height > 170) {
      document.write("<p>Wow, that's big!</p>");
    }

    document.write("</div>");
  });
}

// Call the function to print the details
printArrayDetails(pokemonList);

printArrayDetails(pokemonList2);

function divide(dividend, divisor) {
  if (divisor === 0) {
    return "You are trying to divide by 0";
  } else {
    let result = dividend / divisor;
    return result;
  }
}
