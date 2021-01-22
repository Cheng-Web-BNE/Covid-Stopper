import querystring from "querystring";
import { get } from "./axois";

const BASE_URL = "https://newsapi.org/v2/top-headlines";
const API_KEY = "7890aa0ae827417e8b6098d42cb7e83b";

export const fetchNews = () => {
    const query = querystring.stringify({
        q: "COVID",
        country: "au",
        apiKey: API_KEY,
        page: 1,
        pageSize: 10,
    });
    return get(`${BASE_URL}?${query}`);
};
