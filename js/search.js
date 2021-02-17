let search = () => {
    let query = document.getElementById("textInput").value;
    if (!query) return;
    MovieDB.searchByTitle(query).then((res)=>{paintResults(res.results);});
    paintLoading();
}

// Display loading containers
const paintLoading = () => {
    let main = document.querySelector("main");
    main.innerHTML='<div id="resultsContainer" class="pageWidth"><div class="resultsSpinner"><div class="spinner-border text-secondary" role="status"></div></div></div>';
}

// Paint search results
const paintResults = (movies) => {
    let resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";
    let n = movies.length;
    for (let movie of movies) {
        let container = document.createElement("div");
        container.classList.add("movieContainer");
        if(movie.poster_path) container.style.backgroundImage = `url(https://image.tmdb.org/t/p/w185${movie.poster_path})`;
        else {
            container.style.background = `linear-gradient(20deg, rgb(54, 57, 124),rgb(111, 114, 170))`;
            container.innerHTML = `<h4>${movie.title}</h4>`
        }
        resultsContainer.appendChild(container);
    }
}

document.getElementById("textInput").addEventListener("keydown", (e)=>{
    if (e.key == 'Enter') search();
});
document.getElementById("lupa").addEventListener("click", ()=>{search();});