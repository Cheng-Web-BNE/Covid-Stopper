import { get } from "./axois";

const BASE_URL = "https://covid-stopper-feeds.herokuapp.com/api/twitter";
const WHO_URL = "/who";

export const fetchWHOTwitter = async () => {
    return get(`${BASE_URL}${WHO_URL}`);
};
