// Carousel buttons onclick events depending on view width
(()=>{
    let leftButtons = document.getElementsByClassName("carousel-control-prev");
    for (button of leftButtons) {
        button.onclick = (event)=>{
            let collection = document.getElementById(event.target.getAttribute("data-bs-target"));
            let xscroll = collection.scrollLeft;
            let rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
            let filmwidth = 13.5 * rem;
            let scrolln = (~~((document.body.scrollWidth-24-4*rem)/filmwidth));
            scrolln = (scrolln == 0)?1:scrolln;
            let scrollto = (~~(filmwidth*(~~((xscroll - filmwidth*scrolln)/filmwidth))));
            scrollto = (scrollto<0)?0:scrollto;
            collection.scroll({
                top: 0,
                left: scrollto,
                behavior: 'smooth'
              });
        };
    }
    let rightButtons = document.getElementsByClassName("carousel-control-next");
    for (button of rightButtons) {
        button.onclick = (event)=>{
            let collection = document.getElementById(event.target.getAttribute("data-bs-target"));
            let xscroll = collection.scrollLeft;
            let rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
            let filmwidth = 13.5 * rem;
            let scrolln = (~~((document.body.scrollWidth-24-4*rem)/filmwidth));
            scrolln = (scrolln == 0)?1:scrolln;
            let scrollto = (~~(filmwidth*(~~((xscroll + filmwidth*scrolln)/filmwidth))));
            scrollto = (scrollto<0)?0:scrollto;
            collection.scroll({
                top: 0,
                left: scrollto,
                behavior: 'smooth'
              });;
        };
    }
})();

const paintCollection = (movies,id) => {
    let containers = document.querySelectorAll(`#${id} .movieContainer`);
    let n = (movies.length<containers.length)?movies.length:containers.length;
    for (let i=0; i<n; i++) {
        containers[i].innerHTML="";
        containers[i].style.backgroundImage = `url(https://image.tmdb.org/t/p/w185${movies[i].poster_path})`;
    }
}

// Load movies to home page
(()=>{
    MovieDB.getMostPopular().then((res)=>{paintCollection(res.results,"popularMoviesCarousel")});
    MovieDB.getTopRated().then((res)=>{paintCollection(res.results,"topratedMoviesCarousel")});
    MovieDB.discoverByGenre(16).then((res)=>{paintCollection(res.results,"animationMoviesCarousel")});
    MovieDB.discoverByGenre(53).then((res)=>{paintCollection(res.results,"thrillerMoviesCarousel")});
    MovieDB.discoverByGenre(878).then((res)=>{paintCollection(res.results,"scifiMoviesCarousel")});
    MovieDB.discoverByGenre(35).then((res)=>{paintCollection(res.results,"comedyMoviesCarousel")});
})();