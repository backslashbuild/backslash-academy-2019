import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/post/:id">
          <PostPage />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
