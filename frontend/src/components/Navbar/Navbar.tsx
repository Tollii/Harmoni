import React from "react";
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
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HomeIcon from "@material-ui/icons/Home";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Box from "@material-ui/core/Box";
import {
  Button,
  ListItem,
  List,
  ListItemText,
  Divider,
  Drawer,
  Avatar,
  Menu,
  MenuItem
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import getCookie from "../../service/cookie";
import { Link } from "react-router-dom";
import { User } from "../../service/interface"

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    navbar: {
      display: "flex",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "row-reverse"
      }
    },
    backgroundNavbar: {
      backgroundColor: "rgba(255,255,255,0.9)"
    },
    logo: {
      left: 0,
      position: "absolute"
    },
    rightButtons: {
      position: "absolute",
      right: 0
    },
    listButton: {
      [theme.breakpoints.down("xs")]: {
        display: "none"
      }
    },
    addEventButton: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      [theme.breakpoints.down("xs")]: {
        display: "none"
      }
    },
    profileButton: {
      [theme.breakpoints.down("xs")]: {
        display: "none"
      }
    },
    mobileMenuButton: {
      color: theme.palette.common.black,
      display: "none",
      [theme.breakpoints.down("xs")]: {
        display: "block"
      },
      "&:hover": {
        color: fade(theme.palette.common.black, 0.7)
      }
    },
    drawer: {
      width: drawerWidth,
      variant: "persistent"
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      ...theme.mixins.toolbar,
      justifyContent: "flex-start"
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
      position: "absolute",
      bottom: 0
    },
    profile_menu: {
      marginTop: "45px"
    }
  })
);

interface Navbar {
  logFunc:any;
  setPage:any;
  user:User;
  loggedIn: string;
}

/**
 * Creates a navbar
 * @param logFunc function for logging out
 * @param setPage function for setting page
 * @param user sends in active user
 * @param loggedIn sends in value for whether a user is logged in or not
 * @returns returns a navbar
 */
export default function Navbar(props: Navbar) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const handleCloseLogout = () => {
    setAnchorEl(null);
    document.cookie =
      "token=" + getCookie("token") + "; expires=" + new Date().toUTCString();
    props.logFunc(false);
    window.location.hash = "#/";
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerHome = () => {
    window.location.hash = "#/";
    handleDrawerClose();
  };

  const handleDrawerAllEvents = () => {
    window.location.hash = "#/event";
    handleDrawerClose();
  };

  const handleDrawerAddEvent = () => {
    window.location.hash = "#/addEvent";
    handleDrawerClose();
  };

  const handleDrawerLogin = () => {
    window.location.hash = "#/login";
    handleDrawerClose();
  };

  const handleDrawerLogout = () => {
    handleDrawerClose();
    document.cookie =
      "token=" + getCookie("token") + "; expires=" + new Date().toUTCString();
    props.logFunc(false);
    window.location.hash = "#/";
  };

  const handleDrawerProfile = () => {
    window.location.hash = "#/profile";
    props.setPage(0);
    handleDrawerClose();
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.backgroundNavbar} position="fixed">
        <Toolbar className={classes.navbar}>
          <IconButton
            onClick={handleDrawerOpen}
            className={classes.mobileMenuButton}
          >
            <MenuIcon />
          </IconButton>
          <Button
            onClick={() => {
              window.location.hash = "#/";
            }}
            className={classes.logo}
          >
            <Typography
              style={{
                fontFamily: "Roboto",
                fontSize: "21pt",
                fontWeight: 200
              }}
            >
              HARMONI
            </Typography>
          </Button>
          <Box className={classes.rightButtons}>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <Button
                  onClick={() => (window.location.hash = "#/event")}
                  className={classes.listButton}
                >
                  <FormatListBulletedIcon />
                  <div
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "11pt",
                      fontWeight: 250,
                      marginLeft: 5
                    }}
                  >
                    All Events
                  </div>
                </Button>
              </Grid>
              {(props.user.roleID === 3 || props.user.roleID === 4) && (
                <div>
                  <Grid item>
                    <Button
                      onClick={() => (window.location.hash = "#/addEvent")}
                      className={classes.addEventButton}
                    >
                      <AddCircleIcon />
                      <div
                        style={{
                          fontFamily: "Roboto",
                          fontSize: "11pt",
                          fontWeight: 250,
                          marginLeft: 5
                        }}
                      >
                        Add Event
                      </div>
                    </Button>
                  </Grid>
                </div>
              )}
              <Grid item>
                <Box className={classes.profileButton}>
                  {props.loggedIn ? (
                    <div>
                      <Button onClick={handleClick}>
                        <Avatar alt="Profile" src={props.user.pic_url} />
                        <div
                          style={{
                            fontFamily: "Roboto",
                            fontSize: "11pt",
                            fontWeight: 250,
                            marginLeft: 5
                          }}
                        >
                          {props.user.username}
                        </div>
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        className={classes.profile_menu}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to="/profile"
                        >
                          <MenuItem
                            onClick={() => {
                              handleCloseProfile();
                              props.setPage(0);
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "Roboto",
                                fontSize: "11pt",
                                fontWeight: 250
                              }}
                            >
                              Profile
                            </div>
                          </MenuItem>
                        </Link>
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to="/profile"
                        >
                          <MenuItem
                            onClick={() => {
                              handleCloseProfile();
                              props.setPage(1);
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "Roboto",
                                fontSize: "11pt",
                                fontWeight: 250
                              }}
                            >
                              My Events
                            </div>
                          </MenuItem>
                        </Link>
                        <MenuItem onClick={handleCloseLogout}>
                          <div
                            style={{
                              fontFamily: "Roboto",
                              fontSize: "11pt",
                              fontWeight: 250
                            }}
                          >
                            Logout
                          </div>
                        </MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Button onClick={() => (window.location.hash = "#/login")}>
                      <AccountCircle />
                      <div
                        style={{
                          fontFamily: "Roboto",
                          fontSize: "11pt",
                          fontWeight: 250,
                          marginLeft: 5
                        }}
                      >
                        Login
                      </div>
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        classes={{ paper: classes.drawPaper }}
        onClose={handleDrawerClose}
        open={open}
        anchor="right"
      >
        <Box className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <IconButton onClick={handleDrawerHome} className={classes.drawerHome}>
            <HomeIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItem button onClick={handleDrawerAllEvents}>
            <ListItemAvatar>
              {" "}
              <FormatListBulletedIcon />{" "}
            </ListItemAvatar>
            <ListItemText> Show all events </ListItemText>
          </ListItem>

          {(props.user.roleID === 3 || props.user.roleID === 4) && (
            <ListItem button onClick={handleDrawerAddEvent}>
              <ListItemAvatar>
                {" "}
                <AddCircleIcon />{" "}
              </ListItemAvatar>
              <ListItemText> Add event </ListItemText>
            </ListItem>
          )}
        </List>
        <Box className={classes.drawerProfile}>
          <Divider />
          {props.loggedIn ? (
            <div>
              <ListItem button onClick={handleDrawerProfile}>
                <ListItemAvatar>
                  {" "}
                  <Avatar alt="Profile" src={props.user.pic_url} />
                </ListItemAvatar>
                <ListItemText> {props.user.username} </ListItemText>
              </ListItem>
              <ListItem button onClick={handleDrawerLogout}>
                <ListItemText> Logout </ListItemText>
              </ListItem>
            </div>
          ) : (
            <ListItem button onClick={handleDrawerLogin}>
              <ListItemAvatar>
                {" "}
                <AccountCircle />{" "}
              </ListItemAvatar>
              <ListItemText> Login </ListItemText>
            </ListItem>
          )}
        </Box>
      </Drawer>
    </div>
  );
}
