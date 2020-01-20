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
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Box from '@material-ui/core/Box';
import {
  Button,
  ButtonGroup,
  Grow,
  Hidden,
  Menu,
  ListItem,
  ListItemIcon,
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
    root: {
      flexGrow: 1,
    },
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
    addEventButton: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      position: "absolute",
      right: 100,
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
    icon: {
      fontFamily: '"Apple Chancery", Segoe UI',
      color: "black",
      fontSize: 20
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

    },
    drawPaper: {
      width: drawerWidth
    }
  })
);

export default function Navbar(props:any) {
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

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

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
          <Button onClick={() => (window.location.hash = "/addEvent")} className={classes.addEventButton}>
            <AddCircleIcon />
            Add Event
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
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />

      </Drawer>

    </div>
  );
}

/* <Grid
  container direction="row"
  justify="space-between"
  alignItems="center"
>
  <Hidden xsDown>
    <Grid item sm={4}>

    </Grid>
  </Hidden>
  <Grid item sm={4}>
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search.."
        inputProps={{ "aria-label": "search" }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  </Grid>
  <Hidden xsDown>
    <Grid item>
      <Button
        style={{
          backgroundColor: "transparent",
          borderColor: "transparent"
        }}
        onClick={() => (window.location.hash = "/addEvent")}
      >
        <AddCircleIcon />
        Add Event
      </Button>
    </Grid>
    <Grid item>
      {auth ? (
        <Button
          style={{
            backgroundColor: "transparent",
            borderColor: "transparent"
          }}
          onClick={() => (window.location.hash = "/profile")}
        >
          <Avatar
            alt="Profile"
            src={"http://localhost:8080/profile_picture/" + values.id}
          />
          {values.fullName}
        </Button>
      ) : (
        <Button
          style={{
            backgroundColor: "transparent",
            borderColor: "transparent"
          }}
          onClick={() => (window.location.hash = "/login")}
        >
          <AccountCircle />
        </Button>
      )}
    </Grid>
  </Hidden>
</Grid> */

/*
<Drawer
  className={classes.drawer}
  variant="persistent"
  anchor="left"
  open={openDrawer}
  classes={{
    paper: classes.drawerPaper
  }}
>
  <div className={classes.drawerHeader}>
    <IconButton onClick={handleDrawerClose}>
      {theme.direction === "ltr" ? (
        <ChevronLeftIcon />
      ) : (
        <ChevronRightIcon />
      )}
    </IconButton>
  </div>

  <Grid>
    <img src={require("../../assets/img/harmoni_logo_wide.png")} alt="logo.png" width="210"></img>
  </Grid>

  <Divider />
  <List>
    <Grid item xs={3}>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      //disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={event => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Grid>

    <Grid item>
      {auth && (
        <div>
          <List>
            <ListItem>
              <IconButton
                className={classes.account}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                //color="inherit"
                onClick={() => (window.location.hash = "/login")}
              >
                {getCookie("token") ? (
                  <img src="FileFromServer.jpg"></img>
                ) : (
                  <AccountCircle />
                )}
                <p className={classes.icon}>
                  {getCookie("token") ? "Info" : "Login"}
                </p>
              </IconButton>
            </ListItem>
          </List>
        </div>
      )}
    </Grid>
  </List>
</Drawer>

search: {
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: fade(theme.palette.common.black, 0.5),
  "&:hover": {
    backgroundColor: fade(theme.palette.common.black, 0.5)
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto"
  }
},
searchIcon: {
  width: theme.spacing(80),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
},
inputRoot: {
  color: "inherit"
},
inputInput: {
  padding: theme.spacing(1, 1, 1, 2),
  transition: theme.transitions.create("width"),
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: 200
  }
},
account: {
  // marginRight: 200
},
icon: {
  fontFamily: '"Apple Chancery", Segoe UI',
  color: "black",
  fontSize: 20
},
typography: {
  fontFamily: '"Apple Chancery", Segoe UI',
  color: "black",
  fontSize: 50
},

drawer: {
  width: drawerWidth,
  flexShrink: 0
},
drawerPaper: {
  width: drawerWidth
},
drawerHeader: {
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
},
root: {
  padding: "0px 0px",
  display: "flex",
  alignItems: "center",
  width: 300,
  backgroundColor: "rgba(0, 0, 0, 0.7)"
},
input: {
  marginLeft: theme.spacing(1),
  flex: 1,
  color: "white"
},
iconButton: {
  padding: 5,
  color: "white"
},
divider: {
  height: 28,
  margin: 4
}
})

*/
