fetch("https://pokeapi.co/api/v2/berry/rawst/")
    // once promise resolves, we'll get a response object
    .then(response => console.log(response))
    // for catching errors
    .catch(error => console.error(error));
