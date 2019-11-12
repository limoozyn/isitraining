import axios from "axios";
import * as qs from "query-string";
import {apikey} from "./constants";
import * as cityAutocomplete from "temp/autocomplete_response.json";
import * as currentConditions from "temp/current_conditions.json";

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
  try {
    const response = await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete${params}`,
      {}
    );
    // return cityAutocomplete.default;
    if (response && response.data) {
      if (response.data) {
        return response.data;
      }
      if (response.data.error) {
        const [error] = response.error;
        return {error};
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
  return null;
};

export const getCurrentConditions = async (locationKey) => {
  const params = getRequestStringDataQuery({apikey});
  try {
    const response = await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}${params}`,
      {}
    );
    // return currentConditions.default;
    if (response && response.data) {
      if (response.data) {
        return response.data;
      }
      if (response.data.error) {
        const [error] = response.error;
        return {error};
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
  return null;
};

export const getFiveDaysForecast = async ({locationKey, metric}) => {
  const params = getRequestStringDataQuery({apikey, metric});
  try {
    const response = await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}${params}`,
      {}
    );
    // return currentConditions.default;
    if (response && response.data) {
      if (response.data) {
        return response.data;
      }
      if (response.data.error) {
        const [error] = response.error;
        return {error};
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
  return null;
};
