import axios from "axios";
import * as qs from "query-string";
import {apikey} from "./constants";
import * as cityAutocomplete from "temp/autocomplete_response.json";

const isObject = (obj) => {
  return typeof obj === "object" && obj != null;
};

const getRequestStringDataQuery = (queryObj) => {
  const isParametersExist = isObject(queryObj);
  const parameters = isParametersExist ? queryObj : {};

  if (!isParametersExist) {
    return "";
  }

  return `?${qs.stringify({...parameters})}`;
};

export const getCityAutocomplete = async (searchString) => {
  const params = getRequestStringDataQuery({apikey, q: searchString});
  console.log("getCityAutocomplete param: ", searchString);
  try {
    // const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete${params}`, {});
    return cityAutocomplete.default;
    // console.log('response in servises', response);
    // if (response && response.data) {
    //   if (response.data) {
    //     console.log('truthy response');
    //     return response.data;
    //   }
    //   if (response.data.error) {
    //     const [error] = response.error;
    //     return {error};
    //   }
    // }
  } catch (error) {
    console.error(error);
    return null;
  }
  return null;
};
