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
import EventPage from "./views/EventPage/EventPage";
import {getAuth} from "./service/Authentication";

const root = document.getElementById("root");
if (root) {
  ReactDOM.render(
    <HashRouter>
      <Navbar />
      <Route exact path="/" render={(props) => <Main {...props} isAuth={getAuth} />} />
      <Route exact path="/event/:id" render={(props) => <EventPage {...props} isAuth={getAuth} />}/>
      <div style={{ marginTop: "150px" }}>
        <Route exact path="/addEvent" render={(props) => <Event {...props} isAuth={getAuth} />} />
        <Route exact path="/signUp" render={(props) => <SignUp {...props} isAuth={getAuth} />} />
        <Route exact path="/login" render={(props) => <Login {...props} isAuth={getAuth} />} />
        <Route exact path="/profile" render={(props) => <Profile {...props} isAuth={getAuth} />}/>
      </div>
      <Footer />
    </HashRouter>,
    root
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
