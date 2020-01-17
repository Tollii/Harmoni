import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  Link,
  Typography,
  MenuProps,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles
} from "@material-ui/core/styles";
import DescriptionIcon from "@material-ui/icons/Description";
import SettingsIcon from "@material-ui/icons/Settings";
import DeleteIcon from "@material-ui/icons/Delete";
import AlertDialog from "../../components/AlertDialog/AlertDialog";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

export default (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const role: number = 3; /**Her skal Zaim sin supermetode inn */

  return (
    <div>
      <Grid container>
        <Grid item style={{ margin: "auto" }}>
          {role == 1 && (
            <Button
              style={{ fontSize: "1.5vw", width: "80%" }}
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          )}
          {role ==
            2 /**om man er artist skal man kun få se kontrakt og endre rider */ && (
            <div>
              <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ fontSize: "1.5vw" }}
                variant="contained"
                color="primary"
              >
                Settings
              </Button>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <StyledMenuItem>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Edit rider" />
                </StyledMenuItem>

                <StyledMenuItem>
                  <ListItemIcon>
                    <DescriptionIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="See contract" />
                </StyledMenuItem>
              </StyledMenu>
            </div>
          )}
          {(role == 3 ||
            role ==
              4) /**om man har rolle 3/4(arrang/admin) skal man få knapp med alt */ && (
            <div>
              <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ fontSize: "1.5vw" }}
                variant="contained"
                color="primary"
              >
                Settings
              </Button>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <StyledMenuItem>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Edit" />
                </StyledMenuItem>

                <StyledMenuItem
                  onClick={() =>
                    "Her skal det komme en pop opp som spør at du vil slette"
                  }
                >
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Delete" />
                </StyledMenuItem>

                <StyledMenuItem>
                  <ListItemIcon>
                    <DescriptionIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Contract" />
                </StyledMenuItem>
              </StyledMenu>
            </div>
          )}
          {role == 0 && <div></div>}
          {/**om man ikke er logget inn, så skal ikke knappen vises */}
        </Grid>
      </Grid>
    </div>
  );
};
