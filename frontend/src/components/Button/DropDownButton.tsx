import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
  MenuProps,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  DialogTitle,
  Dialog,
  DialogContentText,
  DialogContent,
  DialogActions
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
import EventService from "../../service/events";
import { Link } from "react-router-dom";
import Button from "./Button";
import MaterialTable, { Column } from 'material-table';

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

interface Row {
  username: string;
  email: string;
  phone: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

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
  const [volunteerDialog, setVolunteerDialog] = useState(false);
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: 'Name', field: 'username' },
      { title: 'Phone', field: 'phone' },
      { title: 'Email', field: 'email' },
    ],
    data: [],
  })


  const setData = (user:any) => {
    return {key: user.id, username: user.username, phone: user.phone, email: user.email}
  }

  useEffect(() => {
    Authentication.getAuth().then((role: any) => {
      setRole(role);
    });
  }, []);
  useEffect(() => {
    EventService.getEventVolunteer(props.event).then((data: boolean) => {
      setVolunteer(data);
    });
    EventService.getEventIsVolunteer(props.event).then((data: boolean) => {
      setIsVolunteer(data);
    });
    EventService.getEventVolunteerAdmin(props.event)
    .then((volunteers:any)=> {
      console.log(volunteers)
      if(volunteers.count > 0) {
        setState({...state, data: volunteers.rows })}
      }
    )
  }, [props.event]);

  return (
    <div>
      <Grid container>
        <Grid item style={{ margin: "auto" }}>
          {role == 1 &&
            (isVolunteer ? (
              <Button
                style={{
                  fontSize: "1.5vw",
                  width: "80%",
                  backgroundColor: "red",
                  color: "white"
                }}
                variant="contained"
                color="inherit"
                onClick={() => {
                  EventService.deleteEventVolunteer(props.event).then(
                    (data: any) => {
                      setIsVolunteer(false);
                    }
                  );
                }}
              >
                QUIT!!
              </Button>
            ) : volunteer ? (
              <Button
                style={{ fontSize: "15px", width: "80%" }}
                variant="contained"
                color="primary"
                onClick={() => {
                  console.log("quit not");
                  EventService.postEventVolunteer(props.event).then(
                    (data: any) => {
                      setIsVolunteer(true);
                    }
                  );
                }}
              >
                Register
              </Button>
            ) : (
              <Button
                style={{ fontSize: "15px", width: "80%" }}
                variant="contained"
                disabled={true}
              >
                Full
              </Button>
            ))}
          {role ==
            2 /**om man er artist skal man kun få se kontrakt og endre rider */ && (
            <div>
              <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                onClick={handleClick}
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
                <Link to={"/editEvent/" + props.event}>
                  <StyledMenuItem>
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                  </StyledMenuItem>
                </Link>
                <StyledMenuItem
                  onClick={e => handleContract(e, props.user, props.event)}
                >
                  <ListItemIcon>
                    <DescriptionIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="See contract" />
                </StyledMenuItem>

                <StyledMenuItem
                  onClick={e => setVolunteerDialog(true)}
                >
                  <ListItemIcon>
                    <DescriptionIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="See volunteers" />
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
              </StyledMenu>
            </div>
          )}
          {role == 0 && <div></div>}
        </Grid>
      </Grid>
      <Dialog
        open={volunteerDialog}
        aria-labelledby="alert-dialog-volunteer"
        aria-describedby="alert-dialog-description"
        onBackdropClick={()=> {
          setVolunteerDialog(false)
          console.log(state);
        }}
      >
        <MaterialTable
          title="Volunteers:"
          columns={state.columns}
          data={state.data}
        />
      </Dialog>
    </div>
  );
};
