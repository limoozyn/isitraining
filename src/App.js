import React from "react";

import "./App.css";
import Navbar from "./components/elements/Navbar";
// import {BrowserRouter} from "react-router-dom";
import {HashRouter} from "react-router-dom";
import MainRoutes from "./routes";
function App() {
  return (
    <div className="App">
      <HashRouter basename="/">
        <Navbar />
        <MainRoutes />
      </HashRouter>
    </div>
  );
}

export default App;
