import axios from "axios";

//BASE DA URL https://api.themoviedb.org/3
// URL DA API https://api.themoviedb.org/3/movie/now_playing?api_key=4d349c58e0f2e49d3165df11cb56c020&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;