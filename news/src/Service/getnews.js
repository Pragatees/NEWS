import axios from 'axios';

export default function getnews(category) {
    const API_KEY = 'd771dc26889c458b8a07bd7e261224f6';
    const API_Endpoint = `https://newsapi.org/v2/top-headlines?country=in&category=${category}`;

    return axios.get(`${API_Endpoint}&apikey=${API_KEY}`);
}
