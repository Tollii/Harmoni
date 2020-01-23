import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Tabs,
  Tab,
  Avatar
} from "@material-ui/core";
import InputField from "../../components/InputField/InputField";
import UserService from "../../service/users";
import RoleService from "../../service/roles";
import MyEvents from "./MyEvents";
import EventService from "../../service/events";
import FileService from "../../service/files";
import AuthService from "../../service/Authentication";
import { useSnackbar } from "material-ui-snackbar-provider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: "24px",
      padding: "20px"
    },
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary,
      width: "100%"
    },
    editPic: {
      fontSize: "12px",
      "&:hover": {
        cursor: "pointer"
      }
    }
  })
);

export default (props: any) => {
  const classes = useStyles();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openChangePass, setOpenChangePass] = React.useState(false);
  const [openEditPic, setOpenEditPic] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [events, setEvents] = useState<any>([]);
  const [pic_url, setPic_url] = useState("");
  const [passwordOk, setChangePass] = React.useState(false);

  const [file, setFile] = useState(new File(["foo"], "empty"));
  const [newValues, setNewValues] = useState({
    fullName: "",
    email: "",
    telephone: "",
    picture: ""
  });
  const [values, setValues] = useState({
    id: 0,
    fullName: "",
    roleID: 0,
    role: "",
    email: "",
    telephone: "",
    picture: ""
  });

  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    confirmed_password: ""
  });

  function checkPhonenumber(inputtxt: any) {
    var phoneno = /^\+?([0-9]{1,3})\)?([ ]{1})?([0-9]{8})$/;
    if (inputtxt.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  }
  const snackbar = useSnackbar();

  const handleUndo = () => {
    // *snip*
  };
  const handleSubmitData = (event: any) => {
    if (!checkPhonenumber(newValues.telephone)) {
      snackbar.showMessage("Telephone number is not valid", "Undo", () =>
        handleUndo()
      );
    } else if (newValues.fullName === "" || newValues.fullName.length > 30) {
      snackbar.showMessage("Name is required or too long", "Undo", () =>
        handleUndo()
      );
    } else if (newValues.email === "") {
      snackbar.showMessage("Email is required", "Undo", () => handleUndo());
    } else {
      setValues({
        fullName: newValues.fullName,
        email: newValues.email,
        telephone: newValues.telephone,
        id: values.id,
        roleID: values.roleID,
        role: values.role,
        picture: values.picture
      });

      UserService.updateOneUser(values.id, {
        username: newValues.fullName,
        email: newValues.email,
        phone: newValues.telephone,
        picture: newValues.picture
      }).then(res => console.log(res));
      setOpenEdit(false);
    }
  };

  const resetNewVal = () => {
    setNewValues({
      fullName: values.fullName,
      email: values.email,
      telephone: values.telephone,
      picture: values.picture
    });
  };
  const resetPassword = () => {
    setPassword({ old_password: "", new_password: "", confirmed_password: "" });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setNewValues({ ...newValues, [name]: value });
  };
  const handlePasswordChange = (event: any) => {
    const { name, value } = event.target;
    setPassword({ ...password, [name]: value });
  };

  const handleChangeTabs = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const fileSelectedHandler = (event: any) => {
    setFile(event.target.files[0]);
  };
  const uploadProfilePicture = () => {
    return Promise.resolve(FileService.postProfilePicture(file));
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    resetNewVal();
  };

  const handleOpenChangePass = () => {
    setOpenChangePass(true);
  };

  const handleCloseChangePass = () => {
    setOpenChangePass(false);
    resetPassword();
  };

  const handleOpenEditPic = () => {
    setOpenEditPic(true);
  };

  const handleCloseNoEditPic = () => {
    setOpenEditPic(false);
  };

  const handleCloseEditPic = () => {
    setOpenEditPic(false);
    setFile(new File(["foo"], ""));
    window.location.reload();
  };

  const handlePasswordError = () => {
    setChangePass(false);
  };

  const handleSubmitPassword = (event: any) => {
    if (
      password.new_password === password.confirmed_password &&
      password.old_password !== "" &&
      password.new_password !== "" &&
      password.old_password !== password.new_password
    ) {
      AuthService.changePassword({
        old_password: password.old_password,
        new_password: password.new_password
      });
      setOpenChangePass(false);
    } else {
      setChangePass(true);
    }
  };

  useEffect(() => {
    UserService.getOneUser().then(res => {
      RoleService.getRole(res.roleID).then((res1: any) => {
        setValues({
          id: res.id,
          roleID: res.roleID,
          fullName: res.username,
          email: res.email,
          telephone: res.phone,
          role: res1.role_name,
          picture: res.picture
        });
        setNewValues({
          fullName: res.username,
          email: res.email,
          telephone: res.phone,
          picture: res.picture
        });
        setPic_url(process.env.REACT_APP_API_URL + "/image/profile/" + res.id);
      });
    });
  }, []);

  useEffect(() => {
    props.isAuth().then((res: any) => {
      if (res !== 4) {
        EventService.getEventsByUser().then((response: any) => {
          if (response.length !== 0) {
            setEvents(response);
          }
        });
      } else {
        EventService.getEvents().then((response: any) => {
          if (response.length !== 0) {
            setEvents(response);
          }
        });
      }
    });
  }, [props]);

  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }

  const errorPasswordMsg = () => {
    return (
      <Dialog open={passwordOk} onClose={handlePasswordError}>
        <DialogTitle>{"An error occurred. Please try again"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type in your old password and confirm your new password below.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handlePasswordError}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Card width={"100%"}>
      <div>
        <Grid container direction="row">
          <Paper className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChangeTabs}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="My profile" {...a11yProps(0)} />
              <Tab label="My events" {...a11yProps(1)} />
            </Tabs>
          </Paper>
        </Grid>
      </div>
      {value === 0 ? (
        <CardContent>
          <Grid
            container
            direction={"column"}
            alignItems={"center"}
            justify={"center"}
            spacing={0}
          >
            <Grid item>
              {pic_url !== "" && (
                <Avatar
                  style={{ height: "250px", width: "250px" }}
                  alt={values.picture}
                  src={pic_url}
                >
                  Picture
                </Avatar>
              )}
            </Grid>
            <Grid item>
              <Typography>
                <Link
                  onClick={handleOpenEditPic}
                  color="inherit"
                  className={classes.editPic}
                >
                  {"Edit profile picture"}
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                style={{
                  fontFamily: "Roboto",
                  fontSize: "26pt",
                  fontWeight: 300
                }}
              >
                {values.fullName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                style={{
                  fontFamily: "Roboto",
                  fontSize: "15pt",
                  fontWeight: 200
                }}
              >
                {values.role}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                style={{
                  fontFamily: "Roboto",
                  fontSize: "15pt",
                  fontWeight: 200
                }}
              >
                {values.email}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                style={{
                  fontFamily: "Roboto",
                  fontSize: "15pt",
                  fontWeight: 200
                }}
              >
                {values.telephone}
              </Typography>
            </Grid>
            <Grid item>
              <Button onClick={handleOpenEdit}>Edit</Button>
              <Button onClick={handleOpenChangePass}>Change Password</Button>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Dialog
              open={openEditPic}
              onClose={handleCloseNoEditPic}
              aria-labelledby="form-dialog-title"
              style={{ width: "100%" }}
            >
              <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
              <DialogContent>
                <Grid container direction="row">
                  <Button variant="contained" component="label">
                    Choose File
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={fileSelectedHandler}
                    />
                  </Button>
                  <Typography style={{ marginLeft: "30px" }}>
                    Chosen file: {file.name}
                  </Typography>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Grid container direction="row" justify="center">
                  <Grid item xs={3}>
                    <Button
                      onClick={() => {
                        uploadProfilePicture().then(() => {
                          handleCloseEditPic();
                        });
                      }}
                      color="primary"
                    >
                      Upload Image
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button onClick={handleCloseNoEditPic} color="primary">
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </Dialog>
          </Grid>

          <Grid item xs={4}>
            <Dialog
              open={openEdit}
              onClose={handleCloseEdit}
              aria-labelledby="form-dialog-title"
              style={{ width: "100%" }}
            >
              <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
              <DialogContent>
                <DialogContentText></DialogContentText>
                <InputField
                  autoFocus
                  name="fullName"
                  label="Name"
                  type="text"
                  value={newValues.fullName}
                  onChange={handleChange}
                />
                <InputField
                  autoFocus
                  name="email"
                  label="Email"
                  type="text"
                  value={newValues.email}
                  onChange={handleChange}
                />
                <InputField
                  autoFocus
                  name="telephone"
                  label="Telephone"
                  type="text"
                  value={newValues.telephone}
                  onChange={handleChange}
                />
              </DialogContent>
              <DialogActions>
                <Grid container direction="row" justify="center">
                  <Grid item xs={3}>
                    <Button onClick={handleSubmitData} color="primary">
                      Save Profile
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button onClick={handleCloseEdit} color="primary">
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid item xs={8}>
            <Grid container>
              <Grid item xs={6}>
                <Dialog
                  open={openChangePass}
                  onClose={handleCloseChangePass}
                  aria-labelledby="form-dialog-title"
                  style={{ width: "100%" }}
                >
                  <DialogTitle id="form-dialog-title">
                    Change Password
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText></DialogContentText>
                    <InputField
                      autoFocus
                      name="old_password"
                      label="Password"
                      value={password.old_password}
                      onChange={handlePasswordChange}
                    />
                                        
                    <InputField
                      autoFocus
                      name="new_password"
                      label="Password"
                      value={password.new_password}
                      onChange={handlePasswordChange}
                    />
                                        
                    <InputField
                      autoFocus
                      name="confirmed_password"
                      label="Password"
                      value={password.confirmed_password}
                      onChange={handlePasswordChange}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Grid container direction="row" justify="center">
                      <Button color="primary" onClick={handleSubmitPassword}>
                                                  Change
                      </Button>
                      <Grid item xs={3}>
                        <Button onClick={handleCloseChangePass} color="primary">
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </DialogActions>
                </Dialog>
              </Grid>
              <Grid item xs={8}>
                <Grid container>
                  <Grid item xs={6}>
                    <Dialog
                      open={openChangePass}
                      onClose={handleCloseChangePass}
                      aria-labelledby="form-dialog-title"
                      style={{ width: "100%" }}
                    >
                      <DialogTitle id="form-dialog-title">
                        <Grid container justify="center" direction="row">
                          Change Password
                        </Grid>
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText></DialogContentText>
                        <InputField
                          autoFocus
                          name="old_password"
                          label="Old Password"
                          value={password.old_password}
                          onChange={handlePasswordChange}
                        />
                                            
                        <InputField
                          autoFocus
                          name="new_password"
                          label="New Password"
                          value={password.new_password}
                          onChange={handlePasswordChange}
                        />
                                            
                        <InputField
                          autoFocus
                          name="confirmed_password"
                          label="Confirm New Password"
                          value={password.confirmed_password}
                          onChange={handlePasswordChange}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Grid container direction="row" justify="center">
                          <Button
                            color="primary"
                            onClick={handleSubmitPassword}
                          >
                            Change
                          </Button>
                          <Button
                            onClick={handleCloseChangePass}
                            color="primary"
                          >
                            Cancel
                          </Button>
                        </Grid>
                      </DialogActions>
                    </Dialog>
                    {passwordOk && errorPasswordMsg()}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      ) : (
        <CardContent>
          <div style={{ marginBottom: "30px" }}>
            <Grid container spacing={4}>
              <MyEvents events={events} user={values.id} />
            </Grid>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
