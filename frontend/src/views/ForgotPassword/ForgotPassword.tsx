import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../components/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputField from "../../components/InputField/InputField";
import Grid from "@material-ui/core/Grid";
import Button from "../../components/Button/Button";
import useForm from "../../service/Form/useForm";
import { validatePassword } from "../../service/Form/Validate";
import Authentication from "../../service/Authentication";
import { useSnackbar } from "material-ui-snackbar-provider";

const useStyles = makeStyles({
  grid: {
    maxWidth: "450px",
    minWidth: "250px"
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "20px"
  },
  pos: {
    marginBottom: 12
  },
  notchedOutline: {
    borderRadius: 0
  }
});

export default function ForgotPassword(props: any){
  const classes = useStyles(props);
  const snackBar = useSnackbar();

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    {
      password: "",
      passwordConfirmed: ""
    },
    validatePassword
  );

  function submit() {
    if (values.password && values.password === values.passwordConfirmed) {
      Authentication.changePasswordForgot({
        new_password: values.password,
        token: props.match.params.token
      }).catch((error: any) => console.log(props.match.params.token));
      snackBar.showMessage("Password successfully reset");
      window.location.hash = "#/login";
    }
  }

  return (
    <Card width={"80%"} style={{ minWidth: "250px", maxWidth: "450px" }}>
      <Grid container className={classes.grid}>
        <CardContent>
          <Grid container justify="center" direction="row">
            <Typography className={classes.title} variant="h3" align="center">
              Change Password
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit} noValidate>
            {errors.password && (
              <Typography color="error">{errors.password}</Typography>
            )}
            <InputField
              name="password"
              label="Password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              type="password"
            />
            {errors.passwordConfirmed && (
              <Typography color="error">{errors.passwordConfirmed}</Typography>
            )}

            <InputField
              name="passwordConfirmed"
              label="Confirm password"
              autoComplete="current-password"
              value={values.passwordConfirmed}
              onChange={handleChange}
              type="password"
            />
            <Grid container direction="row" justify="space-between">
              <Button type="submit">Confirm</Button>
            </Grid>
          </form>
        </CardContent>
      </Grid>
    </Card>
  );
};
