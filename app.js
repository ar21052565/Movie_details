let searchform = document.querySelector("form");
let moviecontainer = document.querySelector(".movie-container");
let input = document.querySelector("input");
let img = document.querySelector("img");
let genre = document.querySelector(".genre");

let url = "http://www.omdbapi.com/?apikey=82c77865&t=";


function updateInfo(actual_data) {
    // initall ,make empty
    moviecontainer.innerHTML = "";
    moviecontainer.classList.remove("noBackground");

    // destructuring
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = actual_data;

    // movie info
    const movie_element = document.createElement("div");

    // movie eleemnt css
    movie_element.classList.add("movie-info");

    movie_element.innerHTML = `<h1>${Title}</h1>
                               <p><strong>Rating : &#11088</strong>${imdbRating}</p>`;

    // movie genre details
    const movieGenreElement = document.createElement("div");
    // its css
    movieGenreElement.classList.add("movie-genre");
    Genre.split(",").forEach(element => {
        const genre = document.createElement("p");
        genre.innerText = element;
        movieGenreElement.appendChild(genre);
    });

    // ye chij 3rd number p add hua h...wo bhi movieElement ke under(jo alreadr movie container ke under h)
    movie_element.appendChild(movieGenreElement);
    movie_element.innerHTML += `<p><strong>Released Date : </strong>${Released}</p>
                                <p><strong>Duration : </strong>${Runtime}</p>
                                <p><strong>Actors : </strong>${Actors}</p>
                                <p><strong>Plot : </strong>${Plot}</p>
                                `
    // Now add poster
    const movieposter = document.createElement("div");
    movieposter.classList.add("movieposter");
    movieposter.innerHTML = `<img src = ${Poster}>`

    // sabase pahle poster add kiye h
    moviecontainer.appendChild(movieposter);

    // uske bnaad name and rating
    moviecontainer.appendChild(movie_element);
}


async function getmoviedetails(movie) {
    try {
        let url = `http://www.omdbapi.com/?apikey=82c77865&t=${movie}`;
        let response = await fetch(url);
        let actual_data = await response.json();
        updateInfo(actual_data);
    }
    catch (er) {
        console.log(er);
        let message = "Please Enter Correct movie name to get movie information";
        showerror(message);
    }
}

function showerror(message){
    moviecontainer.innerHTML = `<h1>${message}</h1>`;
    moviecontainer.classList.add("noBackground");
}

searchform.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let moviename = input.value.trim();
    console.log(moviename);
    if (moviename !== '') {
        showerror("Fetching movie detials...");
        getmoviedetails(moviename);
    } else {
        moviecontainer.innerHTML = `<h1>Please Enter movie name to get movie information</h1>`;
        moviecontainer.classList.add("noBackground");

    }
})





