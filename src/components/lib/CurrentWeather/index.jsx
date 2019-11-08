import React from "react";
import {useStyles} from "./styles";
import {Typography} from "@material-ui/core";
import weatherIconUrl from "helpers/weatherIconUrl";

export default function CurrentWeather(props) {
  const classes = useStyles();
  //TODO: use [Metric/Imperial] to switch between wanted measurement system
  const {city, weatherIcon, weatherText, value, unit} = props;
  return (
    <div className={classes.wrapper}>
      <img src={weatherIconUrl(weatherIcon)} alt={weatherText} />
      <div className={classes.info}>
        <Typography component="span">{city}</Typography>
        <Typography component="span">{`${value}${unit}`}</Typography>
      </div>
    </div>
  );
}
