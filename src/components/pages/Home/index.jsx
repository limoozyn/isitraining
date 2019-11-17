import React, {useState} from "react";
import {useQuery} from "react-query";

import {Paper, Grid, Typography} from "@material-ui/core";
import WeatherWidget from "components/lib/WeatherWidget";
import CitySearch from "components/lib/CitySearch";
import AddToFavorites from "components/lib/AddToFavorites";
import {useStyles} from "./styles";
import {defaultCity} from "constants/city";
import {getCurrentConditions, getFiveDaysForecast} from "services";
import isEmptyObject from "helpers/isEmptyObject";
import flattenCurrentConditions from "helpers/flattenCurrentConditions";
import flattenFiveDaysForecast from "helpers/flattenFiveDaysForecast";
import favoritesStorage from "helpers/favoritesStorage";
import * as StabCurrentConditions from "temp/current_conditions.json";
import * as fiveDaysForecast from "temp/five_days_forecast.json";
import FiveDaysForecastWrapper from "./components/FiveDaysForecastWrapper";

export default function Home() {
  const classes = useStyles();
  const [favorite, setIsFavorite] = useState(false);
  const [city, setCity] = useState(defaultCity);
  const flattenedDefaultCurrentConditions = flattenCurrentConditions(StabCurrentConditions.default);
  const [currentConditions, setCurrentConditions] = useState(flattenedDefaultCurrentConditions);
  const [fiveDaysForecast, setFiveDaysForecast] = useState({});
  const [metric, setMetric] = useState(true);
  const favoriteClickHandler = (city) => {
    favorite ? favoritesStorage.remove(city) : favoritesStorage.add(city);
    setIsFavorite(!favorite);
  };

  const {isLoading: fdfIsLoading, error: fdfError} = useQuery(
    city && ["fiveDaysForecast", {locationKey: city.Key, metric}],
    getFiveDaysForecast,
    {
      staleTime: 3600000,
      onSuccess: (data) => {
        const flattenedFiveDaysForecast = flattenFiveDaysForecast(data.DailyForecasts);
        setFiveDaysForecast(flattenedFiveDaysForecast);
      },
    }
  );

  const {isLoading: ccIsLoading, error: ccError} = useQuery(
    city && ["currentConditions", {locationKey: city.Key}],
    getCurrentConditions,
    {
      staleTime: 3600000,
      onSuccess: (data) => {
        const flattenedCurrentConditions = flattenCurrentConditions(data);
        setCurrentConditions(flattenedCurrentConditions);
      },
    }
  );

  const cityChooseHandler = async (cityObject) => {
    if (isEmptyObject(cityObject)) {
      cityObject = defaultCity;
    }
    setCity(cityObject);
  };

  const renderWeatherText = () => {
    if (ccIsLoading) return "Loading...";
    if (!isEmptyObject(ccError) && ccError.hasOwnProperty("message")) return ccError.message;
    return <Typography variant="h2">{currentConditions.WeatherText}</Typography>;
  };
  return (
    <div className={classes.container}>
      <CitySearch onChoose={cityChooseHandler} />
      <Paper className={classes.mainPane} elevation={3}>
        <Grid container direction="column" justify="space-around" alignItems="center" spacing={7}>
          <Grid container item xs={12} justify="space-around" alignItems="center">
            <Grid item xs={3}>
              <WeatherWidget
                city={city.LocalizedName}
                weatherIcon={currentConditions.WeatherIcon}
                weatherText={currentConditions.WeatherText}
                value={currentConditions.TempValue}
                unit={currentConditions.Unit}
                isLoading={ccIsLoading}
                error={ccError}
              />
            </Grid>
            <Grid item xs={3}>
              <AddToFavorites onClick={() => favoriteClickHandler(city)} isFavorite={favorite} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {renderWeatherText()}
          </Grid>
          <Grid item xs={12} className={classes.dailyForecastWrapper}>
            <FiveDaysForecastWrapper fiveDaysForecast={fiveDaysForecast} isLoading={fdfIsLoading} error={fdfError} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
