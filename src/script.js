const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

let currentPokemonIndex = 1;

function loadPokemon(index) {
  fetch(baseUrl + index)
    .then(response => response.json())
    .then(data => {
      changeImage('img_sprite_front_default', data.sprites.front_default);
      changeText('name', data.name);
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
      alert('Houve um erro ao carregar os dados do Pokémon.');
    });
}

function previousPokemon() {
  if (currentPokemonIndex === 1) {
    fetch(baseUrl)
      .then(response => response.json())
      .then(data => {
        currentPokemonIndex = data.count;
        loadPokemon(currentPokemonIndex);
      });
  } else {
    currentPokemonIndex--;
    loadPokemon(currentPokemonIndex);
  }
}

function nextPokemon() {
  fetch(baseUrl)
    .then(response => response.json())
    .then(data => {
      if (currentPokemonIndex >= data.count) {
        currentPokemonIndex = 1;
      } else {
        currentPokemonIndex++;
      }
      loadPokemon(currentPokemonIndex);
    });
}

function changeImage(id, url) {
  document.getElementById(id).src = url;
}

function changeText(id, text) {
  document.getElementById(id).innerText = text;
}

loadPokemon(currentPokemonIndex);
