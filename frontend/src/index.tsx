import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import Main from "./views/Main/Main";
import * as serviceWorker from "./serviceWorker";
import Navbar from "./components/Navbar/Navbar";
import Event from "./views/Event/Event";
import SignUp from "./views/SignUp/SignUp";
import Login from "./views/Login/Login";
import Footer from "./components/Footer/Footer";
import Profile from "./views/Profile/Profile";


const root = document.getElementById("root");
if (root) {
  ReactDOM.render(
    <HashRouter>
      <Navbar />
      <div style={{ marginTop: "20px"}}>
        <Route exact path="/" component={Main} />
        <Route exact path="/addEvent" component={Event} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
      </div>
      <Footer/>
    </HashRouter>,
    root
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
