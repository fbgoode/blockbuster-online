// Display loading containers
const paintLoading = () => {
    let main = document.querySelector("main");
    main.innerHTML='<div id="resultsContainer" class="pageWidth"><div class="resultsSpinner"><div class="spinner-border text-secondary" role="status"></div></div></div>';
}

// Display no results
const paintNoResults = () => {
    if (nresults>0) return;
    let resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = '<h4>No results found</h4>';
}

// Paint search results
const paintResults = (movies, loadmore = false, checklm = true) => {
    let resultsContainer = document.getElementById("resultsContainer");
    if (nresults==0) resultsContainer.innerHTML = "";
    else if (document.getElementById("loadMore")) document.getElementById("loadMore").remove();
    if (!movies || !movies.length) return;
    for (let movie of movies) {
        let genres = movie.genres;
        if (!genres) genres = movie.genre_ids;
        if (!genres) genres = [];
        if (genreFilter.length && !genreFilter.some(item => genres.includes(item))) continue; // Skip if filtered out by genre
        nresults++;
        let container = document.createElement("div");
        container.classList.add("movieContainer");
        if(movie.poster_path) container.style.backgroundImage = `url(https://image.tmdb.org/t/p/w185${movie.poster_path})`;
        else {
            container.style.background = `linear-gradient(20deg, rgb(54, 57, 124),rgb(111, 114, 170))`;
            container.innerHTML = `<h4>${movie.title}</h4>`
        }
        resultsContainer.appendChild(container);
    }
    let lmdiv = document.createElement("div");
    lmdiv.id = "loadMore";
    lmdiv.classList.add("container-fluid");
    lmdiv.innerHTML = '<div class="spinner-border text-secondary" role="status"></div>';
    resultsContainer.appendChild(lmdiv);
    loadingmore = false;
    if((checklm && nresults<8)||(checklm && loadmore)) checkLoadMore();
}

// Paint movies to home
const paintCollection = (movies,id) => {
    let containers = document.querySelectorAll(`#${id} .movieContainer`);
    let n = (movies.length<containers.length)?movies.length:containers.length;
    for (let i=0; i<n; i++) {
        containers[i].innerHTML="";
        containers[i].style.backgroundImage = `url(https://image.tmdb.org/t/p/w185${movies[i].poster_path})`;
    }
}

// Paint movie containers to home
const paintContainers = (id) => {
    let carousel = document.getElementById(id);
    carousel.innerHTML = '<div class="movieContainer"><div class="spinner-border text-secondary" role="status"></div></div>'.repeat(20);
    carousel.parentElement.innerHTML +=
    `<button class="carousel-control-prev" type="button" data-bs-target="${id}"  data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="${id}"  data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>`;
}

// Load movies to home page
(()=>{
    paintContainers("popularMoviesCarousel");
    MovieDB.getMostPopular().then((res)=>{paintCollection(res.results,"popularMoviesCarousel")});
    paintContainers("topratedMoviesCarousel");
    MovieDB.getTopRated().then((res)=>{paintCollection(res.results,"topratedMoviesCarousel")});
    paintContainers("animationMoviesCarousel");
    MovieDB.discoverByGenre(16).then((res)=>{paintCollection(res.results,"animationMoviesCarousel")});
    paintContainers("thrillerMoviesCarousel");
    MovieDB.discoverByGenre(53).then((res)=>{paintCollection(res.results,"thrillerMoviesCarousel")});
    paintContainers("scifiMoviesCarousel");
    MovieDB.discoverByGenre(878).then((res)=>{paintCollection(res.results,"scifiMoviesCarousel")});
    paintContainers("comedyMoviesCarousel");
    MovieDB.discoverByGenre(35).then((res)=>{paintCollection(res.results,"comedyMoviesCarousel")});
})();