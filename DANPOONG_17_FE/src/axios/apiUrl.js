import axios from "axios";

export const apiUrl = axios.create({
    baseURL: "http://52.78.33.37:8080",
    timeout: 7000,
})