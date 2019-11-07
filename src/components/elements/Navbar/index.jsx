import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import {useStyles} from "./styles";

export default function Navbar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <BeachAccessIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Is It Raining
          </Typography>
          <Link to="/" className={classes.navlink}>
            Home
          </Link>
          <Link to="/favorites" className={classes.navlink}>
            Favorites
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
