import "./App.css";
import { nanoid } from "nanoid";
import { Route, Switch } from "react-router-dom";

import WatchlistPage from "./component/WatchlistPage.js";
import SearchPage from "./component/SearchPage.js";
import React from "react";

function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <Switch>
          <Route exact path="/movie">
            <SearchPage />
          </Route>
          <Route path="/watchlist">
            <WatchlistPage />
          </Route>
        </Switch>
      </React.StrictMode>
    </div>
  );
}

export default App;
