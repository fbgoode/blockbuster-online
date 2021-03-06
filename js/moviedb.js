class APIRequest {
    static handleResponse(res) {
        if (res.status>=200 && res.status<300) return res.data;
        else return new Error (`The Request was unsuccessful. Code ${res.status}: ${res.statusText}`);
    }
}

class MovieDB extends APIRequest {
    static _apiKey = 'cac61624997edd865edf5c5c8caec2a2';
    static _apiURL = 'https://api.themoviedb.org/3'
    static _search = '/search/movie'
    static _searchPeople = '/search/person'
    static _get = '/movie'
    static _popular = '/popular'
    static _toprated = '/top_rated'
    static _discover = '/discover/movie'
    static _lang = 'en-US'
    static searchByTitle(title,page = null) {
        if (page) page = '&page='+page;
        else page = '';
        return axios.get(`${MovieDB._apiURL}${MovieDB._search}?query=${encodeURI(title)}${page}&language=${MovieDB._lang}&api_key=${MovieDB._apiKey}`)
        .then(MovieDB.handleResponse)
        .catch(err=>err);
    }
    static getMostPopular() {
        return axios.get(`${MovieDB._apiURL}${MovieDB._get}${MovieDB._popular}?language=${MovieDB._lang}&api_key=${MovieDB._apiKey}`)
        .then(MovieDB.handleResponse)
        .catch(err=>err);
    }
    static getTopRated() {
        return axios.get(`${MovieDB._apiURL}${MovieDB._get}${MovieDB._toprated}?language=${MovieDB._lang}&api_key=${MovieDB._apiKey}`)
        .then(MovieDB.handleResponse)
        .catch(err=>err);
    }
    static searchPeople(name) {
        return axios.get(`${MovieDB._apiURL}${MovieDB._searchPeople}?query=${encodeURI(name)}&language=${MovieDB._lang}&api_key=${MovieDB._apiKey}`)
        .then(MovieDB.handleResponse)
        .catch(err=>err);
    }
    static getById(id) {
        return axios.get(`${MovieDB._apiURL}${MovieDB._get}/${parseInt(id)}?language=${MovieDB._lang}&api_key=${MovieDB._apiKey}`)
        .then(MovieDB.handleResponse)
        .catch(err=>err);
    }
    static discover(page) {
        if (page) page = '&page='+page;
        else page = '';
        return axios.get(`${MovieDB._apiURL}${MovieDB._discover}?language=${MovieDB._lang}${page}&api_key=${MovieDB._apiKey}`)
        .then(MovieDB.handleResponse)
        .catch(err=>err);
    }
    static discoverByGenre(ids,page = null) {
        if (page) page = '&page='+page;
        else page = '';
        return axios.get(`${MovieDB._apiURL}${MovieDB._discover}?with_genres=${ids}${page}&language=${MovieDB._lang}&api_key=${MovieDB._apiKey}`)
        .then(MovieDB.handleResponse)
        .catch(err=>err);
    }
    static discoverByActor(id) {
        return axios.get(`${MovieDB._apiURL}${MovieDB._discover}?with_cast=${parseInt(id)}&language=${MovieDB._lang}&api_key=${MovieDB._apiKey}`)
        .then(MovieDB.handleResponse)
        .catch(err=>err);
    }
    static discoverByActorName(name,page = null) {
        if (page) page = '&page='+page;
        else page = '';
        return axios.get(`${MovieDB._apiURL}${MovieDB._searchPeople}?query=${encodeURI(name)}&language=${MovieDB._lang}&api_key=${MovieDB._apiKey}`)
        .then(MovieDB.handleResponse)
        .then((res)=>{
            if (res.results.length) return res.results[0].id;
            else return 0;
        })
        .then((id)=>axios.get(`${MovieDB._apiURL}${MovieDB._discover}?with_cast=${parseInt(id)}${page}&language=${MovieDB._lang}&api_key=${MovieDB._apiKey}`))
        .then(MovieDB.handleResponse)
        .catch(err=>err);
    }
}
/*
const test = async() => {
    //let searchbytitle = await MovieDB.searchByTitle('Leonardo DiCaprio');
    //console.log(searchbytitle);
    //let getbyid = await MovieDB.getById(597);
    //console.log(getbyid);
    //let discover = await MovieDB.discover();
    //console.log(discover);
    //let searchperson = await MovieDB.searchPeople('Leonardo DiCaprio');
    //console.log(searchperson);
    //let discoverbyactor = await MovieDB.discoverByActor(0);
    //console.log(discoverbyactor);
    let discoverbyactorname = await MovieDB.discoverByActorName('Leonardo DiCaprio');
    console.log(discoverbyactorname);
}
test();
*/