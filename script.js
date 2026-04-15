
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
        
        // get sprite
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");

        // load berry sprite into source
        imgElement.src = pokemonSprite;
        // change image style to block
        imgElement.style.display = "block";
        
    }
    catch (error) {
        console.error(error);
    }
}
