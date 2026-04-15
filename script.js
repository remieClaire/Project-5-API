
async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        
        const POKEMON_URL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        const response = await fetch(POKEMON_URL);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        console.log(data);
        
        /*------------- pokemon sprite -------------*/
        // get sprite
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");

        // load sprite into source
        imgElement.src = pokemonSprite;
        // change image style to block
        imgElement.style.display = "block";

        /*------------- pokemon name -------------*/
        const pokemonTextName = data.name;
        const pokemonNameElement = document.getElementById("pokemonTextName");

        pokemonNameElement.innerText = `Wild ${pokemonTextName.toUpperCase()} appeared!`;
        
    }
    catch (error) {
        console.error(error);
    }
}
