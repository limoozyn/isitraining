import React, {useState} from "react";
import {Paper, Grid, Typography} from "@material-ui/core";
import CurrentWeather from "components/lib/CurrentWeather";
import CitySearch from "components/lib/CitySearch";
import ForecastWeather from "components/lib/ForecastWeather";
import AddToFavorites from "components/lib/AddToFavorites";
import {useStyles} from "./styles";
import * as currentConditions from "temp/current_conditions.json";
import * as fiveDaysForecast from "temp/five_days_forecast.json";

export default function Home() {
  const classes = useStyles();
  const [favorite, setIsFavorite] = useState(false);
  const {
    WeatherIcon,
    WeatherText,
    Temperature: {
      Metric: {Value, Unit},
    },
  } = currentConditions[0];
  const {DailyForecasts: dailyForecasts} = fiveDaysForecast;
  const dailyForecastFiltered = dailyForecasts.map(
    ({
      Date: date,
      Temperature: {
        Minimum: {Value: dValue, Unit: dUnit},
        Maximum: {Value: nValue, Unit: nUnit},
      },
      Day: {Icon: dIcon, IconPhrase: dIconPhrase},
      Night: {Icon: nIcon, IconPhrase: nIconPhrase},
    }) => {
      return {
        date,
        dValue,
        dUnit,
        nValue,
        nUnit,
        dIcon,
        dIconPhrase,
        nIcon,
        nIconPhrase,
      };
    }
  );
  const favoriteClickHandler = () => {
    console.log("clicked");
    setIsFavorite(!favorite);
  };
  return (
    <div className={classes.container}>
      <CitySearch />
      <Paper className={classes.mainPane} elevation={3}>
        <Grid container direction="column" justify="space-around" alignItems="center" spacing={7}>
          <Grid container item xs={12} justify="space-around" alignItems="center">
            <Grid item xs={3}>
              <CurrentWeather
                city="Tel Aviv"
                weatherIcon={WeatherIcon}
                weatherText={WeatherText}
                value={Value}
                unit={Unit}
              />
            </Grid>
            <Grid item xs={3}>
              <AddToFavorites onClick={favoriteClickHandler} isFavorite={favorite} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2">{WeatherText}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.dailyForecastWrapper}>
            {dailyForecastFiltered.map((dayForecast) => (
              <ForecastWeather forecast={dayForecast} />
            ))}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
