import React, { useEffect, useState } from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
  useTheme
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Box from '@material-ui/core/Box';
import {
  Button,
  ButtonGroup,
  Grow,
  Hidden,
  Menu,
  ListItem,
  List,
  ListItemText,
  Divider,
  Drawer,
  Fab,
  Avatar
} from "@material-ui/core";
import DirectionsIcon from "@material-ui/icons/Directions";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import getCookie from "../../service/cookie";
import UserService from "../../service/users";

const options = ["Catergories", "Conserts", "Festivals"];
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    navbar: {
      display: "flex",
      [theme.breakpoints.down(600)]: {
        flexDirection: 'row-reverse'
      },
    },
    backgroundNavbar: {
      backgroundColor: "rgba(255,255,255,0.5)"
    },
    logo: {
      left: 0,
      position: "absolute"
    },
    listButton: {
      position: "absolute",
      right: 100,
      [theme.breakpoints.down(600)]: {
        display: "none"
      }
    },
    addEventButton: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      position: "absolute",
      right: 50,
      [theme.breakpoints.down(600)]: {
        display: "none"
      }
    },
    profileButton: {
      position: "absolute",
      right: 0,
      [theme.breakpoints.down(600)]: {
        display: "none"
      }
    },
    mobileMenuButton: {
      color: theme.palette.common.black,
      display: "none",
      [theme.breakpoints.down(600)]: {
        display: "block"
      },
      "&:hover": {
        color: fade(theme.palette.common.black, 0.7)
      },
    },
    drawer: {
      width: drawerWidth,
      variant: "persistent",
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    drawerHome: {
      position: "absolute",
      right: 0
    },
    drawPaper: {
      width: drawerWidth
    },
    drawerProfile: {
      width: drawerWidth,
      height: 70,
      position: "absolute",
      bottom: 0
    }
  })
);

export default function Navbar(props: any) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [auth, setAuth] = React.useState(false);
  const [values, setValues] = React.useState({
    id: 0,
    fullName: "Trump",
    roleID: 0,
    picture: ""
  });
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerHome = () => {
    window.location.hash = "/";
    handleDrawerClose();
  }

  const handleDrawerAllEvents = () => {
    window.location.hash = "/events";
    handleDrawerClose();
  }

  const handleDrawerAddEvent = () => {
    window.location.hash = "/addEvent";
    handleDrawerClose();
  }

  const handleDrawerLogin = () => {
    window.location.hash = "/login";
    handleDrawerClose();
  }

  const handleDrawerProfile = () => {
    window.location.hash = "/profile";
    handleDrawerClose();
  }

  useEffect(() => {
    setAuth(props.loggedIn);
    if (auth) {
      UserService.getOneUser().then(res => {
        setValues({
          id: res.id,
          fullName: res.username,
          picture: res.picture,
          roleID: res.roleID
        });
      });
    }
  }, [props.loggedIn]);

  return (
    <div className={classes.root}>
      <AppBar className={classes.backgroundNavbar} position="fixed">
        <Toolbar className={classes.navbar}>
          <IconButton onClick={handleDrawerOpen} className={classes.mobileMenuButton}>
            <MenuIcon/>
          </IconButton>
          <Button onClick={() => (window.location.hash = "/")} className={classes.logo}>
            <img src={require("../../assets/img/harmoni_logo_wide.png")} alt="logo.png" width="210"></img>
          </Button>
          <Button onClick={() => (window.location.hash = "/events")} className={classes.listButton}>
            <FormatListBulletedIcon />
          </Button>
          <Button onClick={() => (window.location.hash = "/addEvent")} className={classes.addEventButton}>
            <AddCircleIcon />
          </Button>
          <Box className={classes.profileButton}>
            {auth ? (
              <Button onClick={() => (window.location.hash = "/profile")}>
                <Avatar alt="Profile" src={"http://localhost:8080/profile_picture/" + values.id}/>
                {values.fullName}
              </Button>
            ) : (
              <Button onClick={() => (window.location.hash = "/login")}>
                <AccountCircle />
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} classes={{ paper: classes.drawPaper }} open={open} anchor="right">
        <Box className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <IconButton onClick={handleDrawerHome} className={classes.drawerHome}>
            <HomeIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItem button onClick={handleDrawerAllEvents}>
            <ListItemAvatar> <FormatListBulletedIcon /> </ListItemAvatar>
            <ListItemText> Show all events </ListItemText>
          </ListItem>

          <ListItem button onClick={handleDrawerAddEvent}>
            <ListItemAvatar> <AddCircleIcon /> </ListItemAvatar>
            <ListItemText> Add event </ListItemText>
          </ListItem>
        </List>
        <Box className={classes.drawerProfile}>
          <Divider />
          {auth ? (
            <ListItem button onClick={handleDrawerProfile}>
              <ListItemAvatar> <Avatar alt="Profile" src={"http://localhost:8080/profile_picture/" + values.id} /> </ListItemAvatar>
              <ListItemText> {values.fullName} </ListItemText>
            </ListItem>
          ) : (
            <ListItem  button onClick={handleDrawerLogin}>
              <ListItemAvatar> <AccountCircle /> </ListItemAvatar>
              <ListItemText> Login </ListItemText>
            </ListItem>
          )}
        </Box>
      </Drawer>

    </div>
  );
}
