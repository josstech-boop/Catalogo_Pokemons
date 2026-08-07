import axios from "axios";

const ApiClient = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export { ApiClient } 