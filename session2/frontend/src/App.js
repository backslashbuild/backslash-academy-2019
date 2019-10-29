import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import HomePage from "./HomePage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/post/:id">
          {/* <HomePage /> */}
          <div>this is the hello route</div>
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
