import * as React from "react";
import {Route, Switch} from "react-router-dom";

import {HomePath, FavoritesPath} from "./constants";

import Home from "components/pages/Home";
import Favorites from "components/pages/Favorites";
import NotFound from "components/pages/NotFound";

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path={HomePath} component={Home} />
      <Route path={FavoritesPath} component={Favorites} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default MainRoutes;
