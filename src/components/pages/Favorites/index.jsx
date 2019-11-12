import React, {useState, useEffect} from "react";
import {Paper, Grid, Typography} from "@material-ui/core";
import favoritesStorage from "helpers/favoritesStorage";
import flattenCurrentConditions from "helpers/flattenCurrentConditions";
import {getCurrentConditions} from "services";
import {useStyles} from "./styles";
import WeatherWidget from "components/lib/WeatherWidget";

export default function Favorites() {
  const classes = useStyles();
  const [favoriteWeaterData, setFavoriteWeaterData] = useState([]);
  useEffect(() => {
    // const newFavoriteWeatherData = [];
    setFavoriteWeaterData(favoritesStorage.get().map(async (city) => fillFavoriteCitiesWithCurrentWeather(city)));
  }, []);

  async function fillFavoriteCitiesWithCurrentWeather(city) {
    const cityData = await getCurrentConditions(city.Key);
    const flattenedCityData = flattenCurrentConditions(cityData);
    console.log("{...flattenedCityData, name: city.LocalizedName}", {...flattenedCityData, name: city.LocalizedName});
    return {...flattenedCityData, name: city.LocalizedName};
  }

  return (
    favoriteWeaterData.length && (
      <div className={classes.container}>
        <Paper className={classes.mainPane} elevation={3}>
          <Grid item xs={12} className={classes.citiesWeatherWrapper}>
            {favoriteWeaterData.map((city) => (
              <WeatherWidget
                city={city.name}
                weatherIcon={city.WeatherIcon}
                weatherText={city.WeatherText}
                value={city.TempValue}
                unit={city.Unit}
              />
            ))}
          </Grid>
        </Paper>
      </div>
    )
  );
}
