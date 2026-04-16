

async function fetchImg() {
    try {
        const API_URL = `https://ghibliapi.dev/films`;

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        let count = 0;

        //using foreach, parse through data and grab images
        data.forEach( (item) => {

            //grab data img
            const poster = item.image; 

            //array of button elements to put pictures in for
            const btnId = ["nausicaa-img", "castle-img", "grave-img", "totoro-img", "kiki-img", "yesterday-img", "porco-img", "ocean-img", "pom-img", "whisper-img", "mononoke-img", "yamada-img", "spirited-img", "cat-img", "howl-img", "earthsea-img", "ponyo-img", "arrietty-img", "poppy hill-img", "wind-img", "kaguya-img", "marnie-img", "red turtle-img", "earwig-img", "heron-img"];

            //get the corresponding input id to put the image into
            const element = document.getElementById(btnId[count]);
            //set the image
            element.src = poster;

            count++;
        });

        


    }
    catch (error) {
        console.error("Error:", error.message);
    }
}

/*
async function fetchData() {
    /* ----------- variables ----------- 
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
        //console.log(data);

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
*/

//fetchData();
fetchImg();
