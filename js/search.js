var currQuery = "";
var loadingmore = false;
var currPage = 1;
var genreFilter = [];
var nresults = 0;

let search = (query = null) => {
    let loadmore = false;
    if (!query) {
        currPage = 1;
        currQuery = "";
        query = document.getElementById("textInput").value;
        genreFilter = getGenreFilter();
        nresults = 0;
    } else loadmore = true;
    if (!query || query == "DdiscoveR") {
        currQuery = "DdiscoveR";
        if(genreFilter.length) {
            let gs = "";
            for (let id of genreFilter) gs+=id+",";
            gs = gs.substr(0,gs.length-1);
            if (!loadmore) paintLoading();
            MovieDB.discoverByGenre(gs,currPage).then((res)=>res.results).then((res)=>{paintResults(res,loadmore)});
        } else {
            if (!loadmore) paintLoading();
            MovieDB.discover(currPage).then((res)=>res.results).then((res)=>{paintResults(res,loadmore)});
        }
        return;
    };
    currQuery=query;
    if (!loadmore) paintLoading();
    if (!isNaN(query) && !loadmore) {
        let p1 = MovieDB.getById(query);
        let p2 = MovieDB.searchByTitle(query).then((res)=>res.results);
        Promise.all([p1,p2]).then((res)=>{
            if(res[0].id) paintResults([res[0]],false,false);
            if(res[1].length) paintResults(res[1]);
            if(!res[0].id && !res[1].length) paintNoResults();
        })
    } else {
        let p1 = MovieDB.searchByTitle(query,currPage).then((res)=>res.results);
        let p2 = MovieDB.discoverByActorName(query,currPage).then((res)=>res.results);
        Promise.all([p1,p2]).then((res)=>{
            if(res[0].length) paintResults(res[0],loadmore);
            if(res[1].length) paintResults(res[1],loadmore);
            if(!res[0].length && !res[1].length) {
                if (!loadmore) paintNoResults();
                else if (document.getElementById("loadMore")) document.getElementById("loadMore").remove();
            }
        })
    }
    
}

// Display loading containers
const paintLoading = () => {
    let main = document.querySelector("main");
    main.innerHTML='<div id="resultsContainer" class="pageWidth"><div class="resultsSpinner"><div class="spinner-border text-secondary" role="status"></div></div></div>';
}

// Display no results
const paintNoResults = () => {
    if (currPage>1) return;
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
        if (genreFilter.length && !genreFilter.some(item => genres.includes(item))) continue;
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

const loadmoreIsInViewport = () => {
    let el = document.getElementById("loadMore");
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

const checkLoadMore = () => {
    if (loadmoreIsInViewport() && !loadingmore) {
        loadingmore = true;
        currPage++;
        search(currQuery);
    }
}

document.getElementById("textInput").addEventListener("keydown", (e)=>{
    if (e.key == 'Enter') search();
});
document.getElementById("lupa").addEventListener("click", ()=>{search();});

document.addEventListener('scroll', checkLoadMore,{passive: true});