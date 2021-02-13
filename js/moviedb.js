class APIRequest {
    static handleResponse(res) {
        if (res.status>=200 && res.status<300) return res.data;
        else return new Error (`The Request was unsuccessful. Code ${res.status}: ${res.statusText}`);
    }
}

class MovieDB extends APIRequest {
    static _apiKey = 'cac61624997edd865edf5c5c8caec2a2';
    static _apiURL = 'http://api.themoviedb.org/3'
    static _search = '/search/movie'
    static _searchPeople = '/search/person'
    static _get = '/movie/'
    static _discover = '/discover/movie'
    static _lang = 'es-ES'
    static searchByTitle(title) {
        return axios.get(`${MovieDB._apiURL}${MovieDB._search}?query=${encodeURI(title)}&language=${MovieDB._lang}&api_key=${MovieDB._apiKey}`)
        .then(MovieDB.handleResponse)
        .catch(err=>err);
    }
    static searchPeople(name) {
        return axios.get(`${MovieDB._apiURL}${MovieDB._searchPeople}?query=${encodeURI(name)}&language=${MovieDB._lang}&api_key=${MovieDB._apiKey}`)
        .then(MovieDB.handleResponse)
        .catch(err=>err);
    }
    static getById(id) {
        return axios.get(`${MovieDB._apiURL}${MovieDB._get}${parseInt(id)}?language=${MovieDB._lang}&api_key=${MovieDB._apiKey}`)
        .then(MovieDB.handleResponse)
        .catch(err=>err);
    }
    static discover() {
        return axios.get(`${MovieDB._apiURL}${MovieDB._discover}?language=${MovieDB._lang}&api_key=${MovieDB._apiKey}`)
        .then(MovieDB.handleResponse)
        .catch(err=>err);
    }
    static discoverByActor(id) {
        return axios.get(`${MovieDB._apiURL}${MovieDB._discover}?with_cast=${parseInt(id)}&language=${MovieDB._lang}&api_key=${MovieDB._apiKey}`)
        .then(MovieDB.handleResponse)
        .catch(err=>err);
    }
    static discoverByActorName(name) {
        return axios.get(`${MovieDB._apiURL}${MovieDB._searchPeople}?query=${encodeURI(name)}&language=${MovieDB._lang}&api_key=${MovieDB._apiKey}`)
        .then(MovieDB.handleResponse)
        .then((res)=>{
            if (res.results[0]) return res.results[0].id;
            else return new Error('No se enontraron actores.')
        })
        .then((id)=>axios.get(`${MovieDB._apiURL}${MovieDB._discover}?with_cast=${parseInt(id)}&language=${MovieDB._lang}&api_key=${MovieDB._apiKey}`))
        .then(MovieDB.handleResponse)
        .catch(err=>err);
    }
}

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