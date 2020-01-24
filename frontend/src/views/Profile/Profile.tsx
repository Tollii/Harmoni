import React, { useState, useEffect, useCallback } from "react";
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
  Avatar
} from "@material-ui/core";
import InputField from "../../components/InputField/InputField";
import UserService from "../../service/users";
import FileService from "../../service/files";
import AuthService from "../../service/Authentication";
import { useSnackbar } from "material-ui-snackbar-provider";
import { User } from "../../service/interface";

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

export default function Profile(props: any) {
  const classes = useStyles();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openChangePass, setOpenChangePass] = React.useState(false);
  const [openEditPic, setOpenEditPic] = React.useState(false);
  const [passwordOk, setChangePass] = React.useState(false);

  const [file, setFile] = useState(new File(["foo"], "empty"));

  const [newValues, setNewValues] = useState<User>({
    username: props.user.username,
    email: props.user.email,
    phone: props.user.phone,
    picture: props.user.picture,
    roleID: props.user.roleID
  });

  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    confirmed_password: ""
  });

  function checkPhonenumber(inputtxt: any) {
    var phoneno = /^(\+[1-9]{1,3})?([ ]{1})?([0-9]{8})$/;
    if (inputtxt.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  }
  const snackbar = useSnackbar();

  const handleSubmitData = (event: any) => {
    if (!checkPhonenumber(newValues.phone)) {
      snackbar.showMessage("Telephone number is not valid");
    } else if (newValues.username === "" || newValues.username.length > 30) {
      snackbar.showMessage("Name is required or too long");
    } else if (newValues.email === "") {
      snackbar.showMessage("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(newValues.email)) {
      snackbar.showMessage("Email is invalid");
    } else {
      let tempUser = {
        ...props.user,
        username: newValues.username,
        email: newValues.email,
        phone: newValues.phone
      };
      props.handleUserChange(tempUser);

      UserService.updateOneUser(props.user.id, {
        username: newValues.username,
        email: newValues.email,
        phone: newValues.phone,
        picture: newValues.picture,
        roleID: props.user.roleID
      }).then(res => res);
      setOpenEdit(false);
    }
  };

  const resetNewVal = useCallback(() => {
    setNewValues({
      username: props.user.username,
      email: props.user.email,
      phone: props.user.phone,
      picture: props.user.picture,
      roleID: props.user.roleID
    });
  }, [props.user]);

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

  useEffect(() => {
    resetNewVal();
  }, [openEdit, resetNewVal]);

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
      })
        .then(() => {
          snackbar.showMessage("Your password was successfully changed");
          setOpenChangePass(false);
        })
        .catch((error: any) => {
          snackbar.showMessage("Old password does not match, please try again");
        });
    } else {
      setChangePass(true);
    }
  };

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
    <CardContent>
      <Grid
        container
        direction={"column"}
        alignItems={"center"}
        justify={"center"}
        spacing={0}
      >
        <Grid item>
          {props.user.pic_url !== "" && (
            <Avatar
              style={{ height: "250px", width: "250px" }}
              alt={"Profile Picture"}
              src={props.user.pic_url}
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
            {props.user.username}
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
            {props.user.role}
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
            {props.user.email}
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
            {props.user.phone}
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
              name="username"
              label="Name"
              type="text"
              value={newValues.username}
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
              name="phone"
              label="Telephone"
              type="text"
              value={newValues.phone}
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
                  <Button color="primary" onClick={handleSubmitPassword}>
                    Change
                  </Button>
                  <Button onClick={handleCloseChangePass} color="primary">
                    Cancel
                  </Button>
                </Grid>
              </DialogActions>
            </Dialog>
            {passwordOk && errorPasswordMsg()}
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  );
}
