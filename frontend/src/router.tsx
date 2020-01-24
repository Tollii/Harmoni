import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Event from "./views/Event/Event";
import SignUp from "./views/SignUp/SignUp";
import Login from "./views/Login/Login";
import Footer from "./components/Footer/Footer";
import ProfileTabs from "./views/Profile/ProfileTabs";
import EventPage from "./views/EventPage/EventPage";
import Main from "./views/Main/Main";
import { HashRouter, Route } from "react-router-dom";
import getCookie from "./service/cookie";
import Contract from "./views/Contract/Contract";
import EventListTabs from "./views/EventList/EventListTabs";
import ForgotPassword from "./views/ForgotPassword/ForgotPassword";
import ForgotForm from "./views/ForgotPassword/ForgotForm";
import EditRidersForArtist from "./views/EditRidersForArtist/EditRidersForArtist";
import { SnackbarProvider } from "material-ui-snackbar-provider";
import UserService from "./service/users";
import RoleService from "./service/roles";
import { User, Role } from "./service/interface";

export default () => {
  const [loggedIn, setLoggedIn] = React.useState(getCookie("token"));
  const [page, setPage] = useState(0);
  const [user, setUser] = useState<User>({
    id: 0,
    roleID: 0,
    username: "",
    email: "",
    phone: "",
    role: "",
    pic_url: ""
  });

  useEffect(() => {
    setLoggedIn(getCookie("token"));
    if (getCookie("token")) {
      UserService.getOneUser().then(res => {
        RoleService.getRole(res.roleID).then((res1: Role) => {
          setUser({
            id: res.id,
            roleID: res.roleID,
            username: res.username,
            email: res.email,
            phone: res.phone,
            role: res1.role_name,
            pic_url: process.env.REACT_APP_API_URL + "/image/profile/" + res.id
          });
        });
      });
    } else {
      setUser({
        id: 0,
        roleID: 0,
        username: "",
        email: "",
        phone: "",
        role: "",
        pic_url: ""
      });
    }
  }, [loggedIn]);

  const handleUserChange = (value: any, name: string = "") => {
    if (name === "") setUser(value);
    else setUser({ ...user, [name]: value });
  };

  return (
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
      <HashRouter>
        <Navbar
          user={user}
          logFunc={setLoggedIn}
          loggedIn={loggedIn}
          setPage={setPage}
        />
        <Route exact path="/" render={(props: any) => <Main {...props} />} />
        <div style={{ marginTop: "70px" }}>
          <Route
            exact
            path="/event/:id"
            render={(props: any) => <EventPage {...props} user={user} />}
          />
          <Route
            exact
            path="/addEvent"
            render={(props: any) => <Event {...props} edit={false} />}
          />
          <Route
            exact
            path="/editEvent/:id"
            render={(props: any) => <Event {...props} edit={true} />}
          />
          <Route
            exact
            path="/signUp"
            render={(props: any) => <SignUp {...props} />}
          />
          <Route
            exact
            path="/login"
            render={(props: any) => <Login {...props} logFunc={setLoggedIn} />}
          />
          <Route
            exact
            path="/profile"
            render={(props: any) => (
              <ProfileTabs
                {...props}
                user={user}
                handleUserChange={handleUserChange}
                setPage={setPage}
                page={page}
              />
            )}
          />
          <Route
            exact
            path="/contract/event/:eventId"
            render={(props: any) => (
              <Contract {...props} logFunc={setLoggedIn} />
            )}
          />
          <Route
            exact
            path="/event"
            render={(props: any) => <EventListTabs {...props} />}
          />
          <Route
            exact
            path="/forgotpassword/:token"
            render={(props: any) => <ForgotPassword {...props} />}
          />
          <Route
            exact
            path="/forgot"
            render={(props: any) => <ForgotForm {...props} />}
          />
          <Route
            exact
            path="/artist/editRider/:eventID/user/:userID"
            render={(props: any) => <EditRidersForArtist {...props} />}
          />
        </div>
        <Footer />
      </HashRouter>
    </SnackbarProvider>
  );
};
