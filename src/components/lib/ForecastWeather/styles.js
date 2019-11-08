import {createStyles, makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      position: "relative",
      margin: "0 5px",
      padding: "3px",
    },
    halfDayBlock: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);
