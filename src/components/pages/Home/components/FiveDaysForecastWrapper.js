import React from "react";
import ForecastWeather from "components/lib/ForecastWeather";
import isEmptyObject from "helpers/isEmptyObject";

export default function FiveDaysForecastWrapper(props) {
  const {fiveDaysForecast} = props;
  if (isEmptyObject(fiveDaysForecast)) return "Loading...";
  else return fiveDaysForecast.map((dayForecast) => <ForecastWeather key={dayForecast.Date} forecast={dayForecast} />);
}
