import React, { useEffect } from "react";
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
import UserService from "../../service/users";
import Authentication from "../../service/Authentication";
import getCookie from "../../service/cookie";

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
      height: 70,
      position: "absolute",
      bottom: 0
    },
    profile_menu: {
      marginTop: "45px"
    }
  })
);

export default function Navbar(props: any) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(false);
  const [role, setRole] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [values, setValues] = React.useState({
    id: 0,
    fullName: "Trump",
    roleID: 0,
    picture: ""
  });
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
    window.location.hash = "#/profile";
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
    window.location.hash = "#/eventUnarchived";
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

  const handleDrawerProfile = () => {
    window.location.hash = "#/profile";
    handleDrawerClose();
  };

  useEffect(() => {
    setAuth(props.loggedIn);
  }, [props.loggedIn]);

  useEffect(() => {
    if (auth) {
      UserService.getOneUser().then(res => {
        setValues({
          id: res.id,
          fullName: res.username,
          picture: res.picture,
          roleID: res.roleID
        });
      });
      Authentication.getAuth().then((role: any) => {
        setRole(role);
      });
    } else {
      UserService.getOneUser().then(res => {
        setValues({
          id: 0,
          fullName: "",
          picture: "",
          roleID: 0
        });
      });
      setRole(0);
    }
  }, [auth]);

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
            <Grid container direction="row">
              <Button
                onClick={() => (window.location.hash = "#/eventUnarchived")}
                className={classes.listButton}
              >
                <FormatListBulletedIcon />
              </Button>
              {(role === 3 || role === 4) && (
                <Button
                  onClick={() => (window.location.hash = "#/addEvent")}
                  className={classes.addEventButton}
                >
                  <AddCircleIcon />
                </Button>
              )}
              <Box className={classes.profileButton}>
                {auth ? (
                  <div>
                    <Button onClick={handleClick}>
                      <Avatar
                        alt="Profile"
                        src={
                          process.env.REACT_APP_API_URL +
                          "/image/profile/" +
                          values.id
                        }
                      />
                      {values.fullName}
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      className={classes.profile_menu}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleCloseProfile}>Profile</MenuItem>
                      <MenuItem onClick={handleCloseLogout}>Logout</MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <Button onClick={() => (window.location.hash = "#/login")}>
                    <AccountCircle />
                  </Button>
                )}
              </Box>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        classes={{ paper: classes.drawPaper }}
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

          {(role === 3 || role === 4) && (
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
          {auth ? (
            <ListItem button onClick={handleDrawerProfile}>
              <ListItemAvatar>
                {" "}
                <Avatar
                  alt="Profile"
                  src={
                    process.env.REACT_APP_API_URL +
                    "/image/profile/" +
                    values.id
                  }
                />
              </ListItemAvatar>
              <ListItemText> {values.fullName} </ListItemText>
            </ListItem>
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
