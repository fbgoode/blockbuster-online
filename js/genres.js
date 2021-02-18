let genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
];

const manageGenreFilter = (event) => {
    if(event.target.id == "allGenres") {
        let buttons = document.querySelectorAll("#genreFilters .selected");
        for (let button of buttons) button.classList.remove("selected");
        event.target.classList.add("selected");
    } else {
        event.target.classList.toggle("selected");
        let buttons = document.querySelectorAll("#genreFilters .selected");
        if (buttons.length == 0) {
            document.getElementById("allGenres").classList.add("selected");
        } else if (buttons.length == 19) {
            for (let button of buttons) button.classList.remove("selected");
            document.getElementById("allGenres").classList.add("selected");
        } else {
            document.getElementById("allGenres").classList.remove("selected");
        }
    }
}

const getGenreFilter = () => {
    let buttons = document.querySelectorAll("#genreFilters .selected");
    let filter = [];
    for (let button of buttons) {
        if (button.getAttribute("genreID")) filter.push(parseInt(button.getAttribute("genreID")));
    }
    return filter;
}

(()=>{
    let genreContainer = document.getElementById("genreFilters");
    let allGenres = document.createElement("button");
    allGenres.classList.add("button","filter-button","selected");
    allGenres.innerHTML = "All Genres";
    allGenres.id = "allGenres";
    genreContainer.appendChild(allGenres);
    allGenres.onclick = manageGenreFilter;
    for (let genre of genres) {
        let newgenre = document.createElement("button");
        newgenre.classList.add("button","filter-button");
        newgenre.innerHTML = genre.name;
        newgenre.setAttribute("genreID",genre.id);
        newgenre.onclick = manageGenreFilter;
        genreContainer.appendChild(newgenre);
    }
})();
