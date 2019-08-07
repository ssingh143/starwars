import { searchPlanets } from "../apis/searchAPI";

const searchPlanet = async term => {
  try {
    if (term === "noresult") {
      return 'noresult';
    }
    const response = await searchPlanets.get(`?search=${term}`);
    let data = response.data.results;
    if (response.data.count !== 0) {
      return data;
    } else {
      return 404;
    }
  } catch (err) {
    return 503;
  }
};

export const searchServices = {
  searchPlanet
};
