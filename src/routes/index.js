import * as React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {
  HomePath,
  FavoritesPath,
} from "./constants";

import Home from "components/pages/Home";
import Favorites from "components/pages/Favorites";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={HomePath} component={Home} />
        <Route exact path={FavoritesPath} component={Favorites} />
      </Switch>
    </BrowserRouter>
  );
};

export default MainRoutes;
