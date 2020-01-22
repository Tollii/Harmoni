import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../components/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputField from "../../components/InputField/InputField";
import Grid from "@material-ui/core/Grid";
import Button from "../../components/Button/Button";
import useForm from "../../service/Form/useForm";
import { validateLogin } from "../../service/Form/Validate";
import Authentication from "../../service/Authentication";
import { Link } from "react-router-dom";
var loginError: boolean = false;
const useStyles = makeStyles({
  grid: {
    maxWidth: "450px",
    minWidth: "250px"
  },
  title: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "20px"
  },

  errormessage: {
    float: "right"
  },
  content: {
    margin: "auto auto "
  }
});

export default (props: any) => {
  const classes = useStyles();
  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    {
      email: "",
      password: ""
    },
    validateLogin
  );

  function submit() {
    const pattern = /.+@[a-z1-9]+.[a-z]+/;
    const check = values.email.match(pattern);
    if (check && values.password) {
      console.log("Submitting form");
      const now = new Date();
      now.setTime(now.getTime() + 1 * 3600 * 1000);
      Authentication.getLogin({
        email: values.email.toLowerCase(),
        password: values.password
      })
        .then((data: any) => {
          document.cookie = "token=" + data + "; expires=" + now.toUTCString();
          window.location.hash = "#/";
          props.logFunc(true);
        })
        .catch((err: any) => {
          loginError = true;
        });
    }
  }

  return (
    <Card
      width={"80%"}
      style={{ marginTop: "10%", minWidth: "250px", maxWidth: "450px" }}
    >
      <Grid container className={classes.grid}>
        <CardContent className={classes.content}>
          <Grid container justify="center" direction="row">
            <Typography className={classes.title} variant="h3" align="center">
              Login
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container justify="center" direction="row">
              <Grid container justify="center" direction="row">
                {errors.email && (
                  <Typography color="error">{errors.email}</Typography>
                )}
              </Grid>

              <InputField
                name="email"
                label="Email"
                type="text"
                value={values.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid container justify="center" direction="row">
              <Grid container justify="center" direction="row">
                {errors.password && (
                  <Typography color="error">{errors.password}</Typography>
                )}
              </Grid>
              <InputField
                name="password"
                label="Password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid container justify="center" direction="row">
              <div>
                {loginError ? (
                  <Typography color="error" className={classes.errormessage}>
                    Invalid email or password
                  </Typography>
                ) : null}
              </div>
            </Grid>

            <Grid container direction="row" justify="space-between">
              <Link to="/forgot" style={{ textDecoration: "none" }}>
                <Button>Forgot password?</Button>
              </Link>
              <Button type="submit">Log in</Button>
            </Grid>
          </form>
        </CardContent>
      </Grid>
    </Card>
  );
};
