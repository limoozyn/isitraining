import {createStyles, makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
    },
    mainPane: {
      marginTop: "30px",
      width: "600px",
      height: "400px",
      paddingTop: "30px",
    },
    citiesWeatherWrapper: {
      display: "flex",
      justifyContent: "space-around",
    },
  })
);
