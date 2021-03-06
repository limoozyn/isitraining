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
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "200px",
      height: "30px",
    },
    mainPane: {
      width: "600px",
      height: "400px",
    },
    dailyForecastWrapper: {
      display: "flex",
      justifyContent: "space-around",
    },
  })
);
