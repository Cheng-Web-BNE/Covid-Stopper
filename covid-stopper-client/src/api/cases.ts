import { get } from "./axois";
import querystring from "querystring";
import { CountryStats } from "../pages/CovidInfo/CovidInfo";
import moment from "moment";

export type SortType =
  | "cases"
  | "todayCases"
  | "deaths"
  | "recovered"
  | "active";

// const BASE_URL = "https://corona.lmao.ninja/v2";
const JHUCSSE_BASE_URL = "https://corona.lmao.ninja/v2/jhucsse";
const WORLDOMETERS_BASE_URL = "https://disease.sh/v3/covid-19";
const COUNTRY_URL = "/countries";
const ALL_URL = "/all";

export const getCasesByCountry = async (country: string) => {
  try {
    const res = await get(JHUCSSE_BASE_URL);
    const totalStats = { totalConfirmed: 0, totalRecovered: 0, totalDeaths: 0 };
    const casesInfo = res.data.reduce((acc: CountryStats[], curr: any) => {
      if (curr.country === country) {
        const {
          province: location,
          stats: { confirmed: cases, deaths, recovered },
        } = curr;

        totalStats.totalConfirmed += cases;
        totalStats.totalRecovered += recovered;
        totalStats.totalDeaths += deaths;

        acc.push({ location, cases, deaths, recovered });
      }
      return acc;
    }, []);
    const { updatedAt } = res.data[0];

    return { totalStats, casesInfo, updatedAt };
  } catch (error) {
    throw error;
  }
};

export const getAllCountriesCases = async (sort: SortType = "cases") => {
  const query = querystring.stringify({
    yesterday: false,
    sort,
  });
  try {
    const res = await get(`${WORLDOMETERS_BASE_URL}${COUNTRY_URL}?${query}`);
    const casesInfo = res.data.reduce((acc: CountryStats[], curr: any) => {
      const {
        country: location,
        countryInfo: { flag },
        cases,
        deaths,
        recovered,
      } = curr;
      acc.push({ location, flag, cases, deaths, recovered });
      return acc;
    }, []);
    const { updated } = res.data[0];

    return {
      casesInfo: casesInfo.splice(0, 20),
      updated: moment(updated).format("YYYY-MM-DD hh:mm:ss"),
    };
  } catch (error) {
    return error;
  }
};

export const getWorldCases = () => {
  return get(`${WORLDOMETERS_BASE_URL}${ALL_URL}`);
};
