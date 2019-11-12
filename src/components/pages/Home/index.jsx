import React, {useState} from "react";
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
  const cityChooseHandler = async (cityObject) => {
    if (isEmptyObject(cityObject)) {
      cityObject = defaultCity;
    }
    setCity(cityObject);
    // Get and display current conditions
    const NewCurrentConditions = await getCurrentConditions(cityObject.Key);
    // TODO: Think about how to have default Tel Aviv conditions data
    if (!NewCurrentConditions || !NewCurrentConditions.length) return;
    const flattenedCurrentConditions = flattenCurrentConditions(NewCurrentConditions);
    setCurrentConditions(flattenedCurrentConditions);
    // Get and display 5 days forecast
    const NewFiveDaysForecast = await getFiveDaysForecast({locationKey: cityObject.Key, metric});
    if (
      !NewFiveDaysForecast ||
      isEmptyObject(NewFiveDaysForecast) ||
      !NewFiveDaysForecast.hasOwnProperty("DailyForecasts")
    )
      return;
    console.log("NewFiveDaysForecast", NewFiveDaysForecast);
    const flattenedFiveDaysForecast = flattenFiveDaysForecast(NewFiveDaysForecast.DailyForecasts);
    setFiveDaysForecast(flattenedFiveDaysForecast);
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
              />
            </Grid>
            <Grid item xs={3}>
              <AddToFavorites onClick={() => favoriteClickHandler(city)} isFavorite={favorite} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2">{currentConditions.WeatherText}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.dailyForecastWrapper}>
            <FiveDaysForecastWrapper fiveDaysForecast={fiveDaysForecast} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
