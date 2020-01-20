import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
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
import Authentication from "../../service/Authentication";
import EventService from "../../service/events"

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
  const [contractUrl, setContractUrl] = useState(
    process.env.REACT_APP_API_URL +
      "/files/contract/user/" +
      props.user +
      "/event/" +
      props.event
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleContract = (
    event: React.MouseEvent<unknown>,
    userId: number,
    eventId: number
  ) => {
    window.location.hash = "contract/user/" + userId + "/event/" + eventId;
  };

  const [role, setRole] = useState();
  const [volunteer, setVolunteer] = React.useState(false);
  const [isVolunteer, setIsVolunteer] = React.useState(false);

  useEffect(() => {
    Authentication.getAuth().then((role: any) => {
      setRole(role);
    });
  }, []);
  useEffect(() => {
    EventService.getEventVolunteer(props.event)
    .then((data:boolean) =>{
      setVolunteer(data)
    });
    EventService.getEventIsVolunteer(props.event)
    .then((data:boolean) =>{
      setIsVolunteer(data)
    });
  }, [props.event]);

  return (
    <div>
      <Grid container>
        <Grid item style={{ margin: "auto" }}>
          {role == 1 && (
            isVolunteer ? (
              <Button
                style={{ fontSize: "1.5vw", width: "80%", backgroundColor:"red", color: "white" }}
                variant="contained"
                color="inherit"
                onClick={()=> {
                  EventService.deleteEventVolunteer(props.event)
                  .then((data:any) =>{
                    console.log("quit")
                    setIsVolunteer(false)
                  });
                }}
                >
              QUIT!!
            </Button>
            )
            :
            (
              volunteer ? (
                <Button
                style={{ fontSize: "1.5vw", width: "80%" }}
                variant="contained"
                color="primary"
                onClick={()=> {
                  console.log("quit not")
                  EventService.postEventVolunteer(props.event)
                  .then((data:any) =>{
                    setIsVolunteer(true)
                  });
                }}
              >
                Register
            </Button>
            )
            :
            (
            <Button
              style={{ fontSize: "1.5vw", width: "80%" }}
              variant="contained"
              disabled={true}
            >
              Full
            </Button>
            )
            )
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

                <StyledMenuItem
                  onClick={() => window.open(contractUrl, "_blank")}
                >
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
                <Link to={"/editEvent/" + 2}>
                  <StyledMenuItem>
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                  </StyledMenuItem>
                </Link>

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

                <StyledMenuItem
                  onClick={e => handleContract(e, props.user, props.event)}
                >
                  <ListItemIcon>
                    <DescriptionIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="See contract" />
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
