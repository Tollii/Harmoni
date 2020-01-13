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
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
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
  Drawer
} from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuIcon from "@material-ui/icons/Menu";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const options = ["Catergoris", "Conserts", "Festivals"];
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      //display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
        color: "black"
        // marginLeft: 20
      }
    },
    backgroundNavbar: {
      //backgroundColor: "white"
      background: "transparent"
    },
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
        //marginRight: 100,

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
    }
  })
);

export default function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [auth] = React.useState(true);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  //const [openDropdown, setOpenDropdown] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const theme = useTheme();
  /*const handleClose = () => {
    setAnchorEl(null);
  };*/
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
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div>
      <AppBar className={classes.backgroundNavbar} position="static">
        <Toolbar className={classes.backgroundNavbar}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Hidden smUp>
              <Grid item xs={3}>
                <IconButton
                  color="primary"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  //className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Hidden xsDown>
              <Grid item xs={3} sm={3}>
                <Typography className={classes.typography} variant="h3" noWrap>
                  Harmoni
                </Typography>
              </Grid>
            </Hidden>
            <Hidden xsDown>
              <Grid item xs={3}>
                <ButtonGroup
                  variant="contained"
                  ref={anchorRef}
                  aria-label="split button"
                >
                  <Button onClick={handleClick}>
                    {options[selectedIndex]}
                  </Button>
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
                          placement === "bottom"
                            ? "center top"
                            : "center bottom"
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
                                onClick={event =>
                                  handleMenuItemClick(event, index)
                                }
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
            </Hidden>

            <Grid item xs={3} sm={3}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </Grid>
            <Hidden xsDown>
              <Grid item>
                {auth && (
                  <div>
                    <IconButton
                      className={classes.account}
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      //color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                  </div>
                )}
              </Grid>
            </Hidden>
          </Grid>
        </Toolbar>
      </AppBar>
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
          <Typography className={classes.typography} variant="h3" noWrap>
            Harmoni
          </Typography>
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
                <IconButton
                  className={classes.account}
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  //color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
            )}
          </Grid>
        </List>
      </Drawer>
    </div>
  );
}
