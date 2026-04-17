//importing animejs library via CDN
import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.es.js';

//Ghibli API
const API_URL = `https://ghibliapi.dev/films`;
//gets inputs
const allInput = document.querySelectorAll('input');
//gets inputs, specifying their input id
const btnInputs = ["nausicaa-img", "castle-img", "grave-img", "totoro-img", "kiki-img", "yesterday-img", "porco-img", "ocean-img", "pom-img", "whisper-img", "mononoke-img", "yamada-img", "spirited-img", "cat-img", "howl-img", "earthsea-img", "ponyo-img", "arrietty-img", "poppy-hill-img", "wind-img", "kaguya-img", "marnie-img", "red-turtle-img", "earwig-img", "heron-img"];

//dialog object that shows movie details
const dialog = document.getElementById("dialog");
//div encapsulating dialog
const dialogWrapper = document.querySelector(".dialog-wrapper");

//registers actions for input buttons
function registerInput() {

    //register events for inputs
    allInput.forEach( (input) => {
        //register modal popup when clicked
        input.addEventListener('click', (e) => {
            fetchDetails(e.target.id);
        });
        //register animations when hovered over
        input.addEventListener('mouseenter', (e) => {
            console.log(e.target.id);
            anime({
                targets: `#${e.target.id}`,
                scale: 1.05,
                duration: 400, 
                easing: 'easeInOutSine'
            });
        });
        //register animations when mouse leaves input
        input.addEventListener('mouseleave', (e) => {
            console.log("mouse left")
            anime({
                targets: `#${e.target.id}`,
                scale: 1,
                duration: 400,
                easing: 'easeInOutSine'
            });
        })
    });
}

//gets animations after images load
function getAnimations() {
    //animates header and movie posters loading in
    anime({
        targets: ['.row input', 'img'],
        opacity: [0, 1],
        duration: 5000
    });

}

let elementIndex = 0;

//fetches movie details for modal
async function fetchDetails(input) {
    try {
        //getting response from server
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let index = 0;
        
        //match input to id in button array
        btnInputs.forEach( (btn) => {
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


        dialog.showModal();
        //animate modal popping up (slow pop up)
        anime({
            targets: '#dialog',
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutCubic'
        });

    }
    catch (error) {
        console.error("Error:", error.message);
    }
}

//fetches images for each input
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
            const element = document.getElementById(btnInputs[count]);
            //set the image
            element.src = poster;

            count++;
        });

        getAnimations();

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
        anime({
            targets: '#dialog',
            scale: [1, 0.8],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInOutSine',
            //close dialog at end of animation
            complete: () => dialog.close()
        });
    }
});
