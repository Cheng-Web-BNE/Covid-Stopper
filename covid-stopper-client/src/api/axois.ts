import axios from "axios";

// axios.defaults.baseURL = "http://covid-stopper.momacorps.com"

export const get = async (url: string, config?: {}) => {
    return await axios.get(url, config);
};

export const post = async <T>(url: string, data: T, config?: {}) => {
    return await axios.post(url, data, config);
};
