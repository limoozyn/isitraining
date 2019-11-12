import {createStyles, makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    currentWeatherImage: {
      width: "30px",
      height: "30px",
      marginLeft: "",
    },
    info: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
    },
  })
);
