const API_URL = `https://ghibliapi.dev/films`;

//array of button elements to put pictures in for
const btnId = ["nausicaa-img", "castle-img", "grave-img", "totoro-img", "kiki-img", "yesterday-img", "porco-img", "ocean-img", "pom-img", "whisper-img", "mononoke-img", "yamada-img", "spirited-img", "cat-img", "howl-img", "earthsea-img", "ponyo-img", "arrietty-img", "poppy hill-img", "wind-img", "kaguya-img", "marnie-img", "red turtle-img", "earwig-img", "heron-img"];

const dialog = document.getElementById("dialog");
const dialogWrapper = document.querySelector(".dialog-wrapper");

function registerInput() {
    const allInput = document.querySelectorAll('input');

    //register click event for inputs
    allInput.forEach( (input) => {
        input.addEventListener('click', (e) => {
            fetchDetails(e.target.id);
        });
    });
}

function showMovieDetails() {
    fetchDetails();
    dialog.showModal();
}

let elementIndex = 0;

async function fetchDetails(input) {
    try {
        //getting response from server
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let index = 0;
        
        //match input to id in button array
        btnId.forEach( (btn) => {
            if (btn == input) {
                //getting index of button
                elementIndex = index;
                return;
            }
            index++;
        });

        const data = await response.json();
        
        //json data 
        const banner = data[elementIndex].movie_banner;

        const title = data[elementIndex].title;
        const ogTitle = data[elementIndex].original_title;
        const romaTitle = data[elementIndex].original_title_romanised;
        const date = data[elementIndex].release_date;
        const runTime = data[elementIndex].running_time;
        const director = data[elementIndex].director;
        const desc = data[elementIndex].description;

        //html elements
        const movieTitle = document.getElementById("movie-title");
        const romaMovieTitle = document.getElementById("roma-movie-title");
        const timeDetails = document.getElementById("time-details");
        const ghibliDirector = document.getElementById("ghibli-director");
        const description = document.getElementById("description");

        movieTitle.textContent = title;
        romaMovieTitle.textContent = `${ogTitle} (${romaTitle})`;
        timeDetails.textContent = `${date} | ${runTime}m`;
        ghibliDirector.textContent = `${director}`;
        description.textContent = `${desc}`;

        
        dialog.style.backgroundImage = `url('${banner}')`;

    }
    catch (error) {
        console.error("Error:", error.message);
    }
}

async function fetchImg() {
    try {
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

fetchImg();
registerInput();

//for closing dialog
dialog.addEventListener("click", (e) => {
    //close dialog so long as content outside of wrapper is clicked
    if (!dialogWrapper.contains(e.target)) {
        dialog.close();
    }
});
