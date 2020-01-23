import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../components/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputField from "../../components/InputField/InputField";
import Grid from "@material-ui/core/Grid";
import Button from "../../components/Button/Button";
import useForm from "../../service/Form/useForm";
import validateSignUp from "../../service/Form/Validate";
import Authentication from "../../service/Authentication";
import { useSnackbar } from "material-ui-snackbar-provider";

const useStyles = makeStyles({
  grid: {
    maxWidth: "450px",
    minWidth: "250px"
  },

  title: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "20px"
  }
});

export default (props: any) => {
  const classes = useStyles(props);

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    {
      email: "",
      emailConfirmed: "",
      password: "",
      passwordConfirmed: "",
      fullName: "",
      telephone: ""
    },
    validateSignUp
  );

  const snackbar = useSnackbar();

  const handleUndo = () => {
    // *snip*
  };
  function submit() {
    const pattern = /.+@[a-z1-9]+.[a-z]+/;
    const check = values.email.match(pattern);
    if (check && values.password && values.fullName && values.telephone) {
      console.log("Submitted form");
      Authentication.signUp({
        email: values.email.toLowerCase(),
        password: values.password,
        username: values.fullName,
        phone: values.telephone
      }).then((data: any) => console.log(data));
      window.location.hash = "#/login";
      snackbar.showMessage(
        "You have created a user. You can now log in with your username and password",
        "Undo",
        () => handleUndo()
      );
    }
  }

  return (
    <Card
      width={"80%"}
      style={{ marginTop: "10%", minWidth: "250px", maxWidth: "450px" }}
    >
      <Grid container className={classes.grid}>
        <CardContent>
          <Grid container justify="center" direction="row">
            <Typography className={classes.title} variant="h3" align="center">
              Sign up
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container justify="center" direction="row">
              {errors.email && (
                <Typography color="error">{errors.email}</Typography>
              )}

              <InputField
                name="email"
                label="Email"
                type="text"
                required={true}
                value={values.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid container justify="center" direction="row">
              {errors.emailConfirmed && (
                <Typography color="error">{errors.emailConfirmed}</Typography>
              )}

              <InputField
                name="emailConfirmed"
                label="Confirm email"
                type="text"
                required={true}
                value={values.emailConfirmed}
                onChange={handleChange}
              />
            </Grid>
            <Grid container justify="center" direction="row">
              {errors.password && (
                <Typography color="error">{errors.password}</Typography>
              )}

              <InputField
                name="password"
                label="Password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid container justify="center" direction="row">
              {errors.passwordConfirmed && (
                <Typography color="error">
                  {errors.passwordConfirmed}
                </Typography>
              )}
              <InputField
                name="passwordConfirmed"
                label="Confirm Password"
                autoComplete="current-password"
                value={values.passwordConfirmed}
                onChange={handleChange}
              />
            </Grid>
            <Grid container justify="center" direction="row">
              {errors.fullName && (
                <Typography color="error">{errors.fullName}</Typography>
              )}

              <InputField
                name="fullName"
                label="Full name"
                type="text"
                required={true}
                value={values.fullName}
                onChange={handleChange}
              />
              {errors.telephone && (
                <Typography color="error">{errors.telephone}</Typography>
              )}

              <InputField
                name="telephone"
                label="Telephone"
                type="numeric"
                pattern="[0-9]*"
                required={true}
                value={values.telephone}
                onChange={handleChange}
              />
            </Grid>
            <Grid container direction="row" justify="space-between">
              <Button onClick={() => (window.location.hash = "#/login")}>
                Already have a user?
              </Button>
              <Button type="submit">Sign up</Button>
            </Grid>
          </form>
        </CardContent>
      </Grid>
    </Card>
  );
};
