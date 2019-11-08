import React from "react";
import {useStyles} from "./styles";
import {Typography, Card} from "@material-ui/core";
import weatherIconUrl from "helpers/weatherIconUrl";
import moment from "moment";

export default function ForecastWeather(props) {
  const classes = useStyles();
  //TODO: use [Metric/Imperial] to switch between wanted measurement system
  const {date, dValue, dUnit, nValue, nUnit, dIcon, dIconPhrase, nIcon, nIconPhrase} = props.forecast;
  const getWeekDay = (date) => {
    return moment(date).format("ddd");
  };
  return (
    <Card className={classes.wrapper}>
      <Typography component="span">{getWeekDay(date)}</Typography>
      <div className={classes.halfDayBlock}>
        <img src={weatherIconUrl(dIcon)} alt={dIconPhrase} />
        <Typography component="span" color="textSecondary">
          {`${nValue}${nUnit}`}
        </Typography>
      </div>
      <div className={classes.halfDayBlock}>
        <img src={weatherIconUrl(nIcon)} alt={nIconPhrase} />
        <Typography component="span" color="textSecondary">
          {`${dValue}${dUnit}`}
        </Typography>
      </div>
    </Card>
  );
}
