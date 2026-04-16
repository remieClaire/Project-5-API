const API_URL = `https://ghibliapi.dev/films`;

async function fetchImg() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        //using foreach, parse through data and grab images


    }
    catch (error) {
        console.error("Error:", error.message);
    }
    



    var idArr = [];
}

async function fetchData() {
    /* ----------- variables ----------- */
    //setting URL source
    const URL = `https://ghibliapi.dev/films/86e544fd-79de-4e04-be62-5be67d8dd92e`;

    try {
        
        //getting response from URL
        const response = await fetch(URL);
        
        console.log("Status:", response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        //get data from json file response
        const data = await response.json();
        console.log(data);

        //get image 
        const nausicaaPoster = data.image;
        //get movie slot element
        const nausicaaElement = document.getElementById("nausicaa-img");

        //set image
        nausicaaElement.src = nausicaaPoster;
        nausicaaElement.style.display = "block";

    }
    catch (error) {
        console.error("Error:", error.message);
    }
}

fetchData();
