import React, { useEffect, useState } from "react";
import {
  Grid,
  MenuProps,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DescriptionIcon from "@material-ui/icons/Description";
import SettingsIcon from "@material-ui/icons/Settings";
import DeleteIcon from "@material-ui/icons/Delete";
import EventService from "../../service/events";
import UserService from "../../service/users";
import { Link } from "react-router-dom";
import Button from "./Button";
import MaterialTable, { Column } from "material-table";
import AlertDialog from "../AlertDialog/AlertDialog";

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

/**
 * Creates a dropdown button
 * @param columns sends in a column containing the header values for volunteers
 * @param data sends in a table of data about volunteers
 * @returns returns a dropdown button
 */
export default function DropDownButton(props: any){
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [contractUrl] = useState(
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

  const handleAllContracts = (eventId: number) => {
    window.location.hash = "#/contract/event/" + eventId;
  };

  const handleEditRider = async () => {
    let userID = await UserService.getOneUser().then(user => user.id);
    window.location.hash =
      "#/artist/editRider/" + props.event + "/user/" + userID;
  };

  function handleAlert(open: boolean) {
    setAlertOpen(open);
  }

  const [role, setRole] = useState();
  const [alertOpen, setAlertOpen] = useState(false);
  const [volunteer, setVolunteer] = React.useState(false);
  const [isVolunteer, setIsVolunteer] = React.useState(false);
  const [volunteerDialog, setVolunteerDialog] = useState(false);

  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: "Name", field: "username" },
      { title: "Phone", field: "phone" },
      { title: "Email", field: "email" }
    ],
    data: []
  });

  useEffect(() => {
    UserService.getOneUser().then((user: any) => {
      setRole(user.roleID);
    });
  }, [props.event]);

  useEffect(() => {
    if (role === 1) {
      EventService.getEventVolunteer(props.event).then((data: boolean) => {
        setVolunteer(data);
      });
      EventService.getEventIsVolunteer(props.event).then((data: boolean) => {
        setIsVolunteer(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.event, role, props.myContract]);

  function getAllVolunteers() {
    if ((role === 3 && props.eventConnection) || role === 4) {
      EventService.getEventVolunteerAdmin(props.event).then(
        (volunteers: any) => {
          if (volunteers.count > 0) {
            setState(state => ({ ...state, data: volunteers.rows }));
          }
          setVolunteerDialog(true);
        }
      );
    }
  }
  return (
    <div>
      <Grid container>
        <Grid item style={{ margin: "auto" }}>
          {role === 1 &&
            (isVolunteer ? (
              <Button
                style={{
                  fontSize: "15px",
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
          {role ===
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
                {props.eventConnection ? (
                  <StyledMenuItem onClick={handleEditRider}>
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Edit rider" />
                  </StyledMenuItem>
                ) : (
                  <StyledMenuItem>
                    <ListItemText primary="No permission" />
                  </StyledMenuItem>
                )}
                {props.myContract === true ? (
                  <StyledMenuItem
                    onClick={() => window.open(contractUrl, "_blank")}
                  >
                    <ListItemIcon>
                      <DescriptionIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="See contract" />
                  </StyledMenuItem>
                ) : null}
              </StyledMenu>
            </div>
          )}
          {(role === 3 || role === 4) &&
          (role === 4 ||
            (role === 3 &&
              props.eventConnection)) /**om man har rolle 3/4(arrang/admin) skal man få knapp med alt */ ? (
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
                <div>
                  <Link
                    to={"/editEvent/" + props.event}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <StyledMenuItem>
                      <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Edit" />
                    </StyledMenuItem>
                  </Link>

                  <StyledMenuItem
                    onClick={e => handleAllContracts(props.event)}
                  >
                    <ListItemIcon>
                      <DescriptionIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="See contract" />
                  </StyledMenuItem>

                  <StyledMenuItem onClick={() => getAllVolunteers()}>
                    <ListItemIcon>
                      <DescriptionIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="See volunteers" />
                  </StyledMenuItem>

                  <StyledMenuItem onClick={() => setAlertOpen(!alertOpen)}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                  </StyledMenuItem>
                </div>
              </StyledMenu>
              <AlertDialog
                open={alertOpen}
                handleAlert={handleAlert}
                eventID={props.event}
              />
            </div>
          ) : null}
        </Grid>
      </Grid>
      <Dialog
        open={volunteerDialog}
        aria-labelledby="alert-dialog-volunteer"
        aria-describedby="alert-dialog-description"
        onBackdropClick={() => {
          setVolunteerDialog(false);
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
}
