import React from "react";
import ForecastWeather from "components/lib/ForecastWeather";
import isEmptyObject from "helpers/isEmptyObject";

export default function FiveDaysForecastWrapper(props) {
  const {fiveDaysForecast, isLoading, error} = props;
  if (isLoading) return "Loading...";
  if (!isEmptyObject(error) && error.hasOwnProperty("message")) return error.message;
  else
    return fiveDaysForecast.length
      ? fiveDaysForecast.map((dayForecast) => <ForecastWeather key={dayForecast.Date} forecast={dayForecast} />)
      : null;
}
