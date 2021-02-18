// Global variables for infinite scroll
var currQuery = "";
var loadingmore = false;
var currPage = 1;
var genreFilter = [];
var nresults = 0;

// Search logic
const search = (query = null) => {
    let loadmore = false;
    if (!query) { // new search
        currPage = 1;
        currQuery = "";
        query = document.getElementById("textInput").value;
        genreFilter = getGenreFilter();
        nresults = 0;
    } else loadmore = true; // loading more films
    if (!query || query == "DdiscoveR") { // Empty query: discover
        searchDiscover(loadmore);
        return;
    }
    currQuery=query;
    if (!loadmore) paintLoading();
    if (!isNaN(query) && !loadmore) searchByIdAndTitle(query); // Number query & new search: get by ID & search
    else searchByCastAndTitle(query,loadmore);  // Not number or loading more: search & search by cast
}

const searchDiscover = (loadmore) => {
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
}

const searchByIdAndTitle = (query) => {
    let p1 = MovieDB.getById(query);
    let p2 = MovieDB.searchByTitle(query).then((res)=>res.results);
    Promise.all([p1,p2]).then((res)=>{
        if(res[0].id) paintResults([res[0]],false,false);
        if(res[1].length) paintResults(res[1]);
        if(!res[0].id && !res[1].length) paintNoResults();
    })
}

const searchByCastAndTitle = (query,loadmore) => {
    let p1 = MovieDB.searchByTitle(query,currPage).then((res)=>res.results);
    let p2 = MovieDB.discoverByActorName(query,currPage).then((res)=>res.results);
    Promise.all([p1,p2]).then((res)=>{
        if(res[0].length) paintResults(res[0],loadmore);
        if(res[1].length) paintResults(res[1],loadmore);
        if(!res[0].length && !res[1].length) {
            if (!loadmore || nresults==0) paintNoResults();
            else if (document.getElementById("loadMore")) document.getElementById("loadMore").remove();
        }
    })
}

// Check if user is in bottom of page
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

// Check if we need to load more films (on scroll)
const checkLoadMore = () => {
    if (loadmoreIsInViewport() && !loadingmore) {
        loadingmore = true;
        currPage++;
        search(currQuery);
    }
}

// Listeners for search & infinite scroll
document.getElementById("textInput").addEventListener("keydown", (e)=>{if (e.key == 'Enter') search();});
document.getElementById("lupa").addEventListener("click", ()=>{search();});
document.addEventListener('scroll', checkLoadMore, {passive: true});