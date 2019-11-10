import {createStyles, makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  })
);
