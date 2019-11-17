import React, {useState, useEffect} from "react";
import {useQuery} from "react-query";
import {Paper, Grid, Typography} from "@material-ui/core";
import favoritesStorage from "helpers/favoritesStorage";
import flattenCurrentConditions from "helpers/flattenCurrentConditions";
import {getCurrentConditions} from "services";
import {useStyles} from "./styles";
import WeatherWidget from "components/lib/WeatherWidget";

export default function Favorites() {
  const classes = useStyles();
  const [favoriteWeatherData, setFavoriteWeatherData] = useState([]);
  useEffect(() => {
    const favoritesArray = favoritesStorage.get();
    const getData = async () => {
      return Promise.all(favoritesArray.map((city) => fillFavoriteCitiesWithCurrentWeather(city)));
    };
    getData().then((data) => {
      setFavoriteWeatherData(data);
    });
  }, []);

  async function fillFavoriteCitiesWithCurrentWeather(city) {
    const cityData = await getCurrentConditions(city.Key);
    const flattenedCityData = flattenCurrentConditions(cityData);
    return {...flattenedCityData, name: city.LocalizedName};
  }
  // if(isLoading) return ('Loading');
  // if(error) return (`${error}`);
  return (
    favoriteWeatherData.length && (
      <div className={classes.container}>
        <Paper className={classes.mainPane} elevation={3}>
          <Grid item xs={12} className={classes.citiesWeatherWrapper}>
            {favoriteWeatherData.map((city) => (
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
