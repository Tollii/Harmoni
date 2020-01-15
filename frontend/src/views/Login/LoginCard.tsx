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
  pos: {
    marginBottom: 12
  },
  notchedOutline: {
    borderRadius: 0
  },
  custom: {
    minWidth: "250px",
    maxWidth: "450px",
    marginTop: "20px",
    margin: "auto"
  }
});

export default () => {
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
    if(check) {
      console.log("Submitting form");
      const now = new Date();
      now.setTime(now.getTime() + 1 * 3600 * 1000)
      Authentication.getLogin({
        email: values.email,
        password: values.password
      }).then((data: any) => (document.cookie = "token="+data+"; expires="+now.toUTCString()));
      window.location.href ="http://localhost:3000/";
    }
  }

  return (
    <div className={classes.custom}>
      <Card>
        <Grid container className={classes.grid}>
          <CardContent>
            <Grid item>
              <Typography className={classes.title} variant="h3" align="center">
                Login
              </Typography>
            </Grid>

            <form onSubmit={handleSubmit} noValidate>
              {errors.email && <Typography>{errors.email}</Typography>}

              <InputField
                name="email"
                label="Email"
                type="text"
                value={values.email}
                onChange={handleChange}
              />
              {errors.password && <Typography>{errors.password}</Typography>}

              <InputField
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
              />

              <Grid container direction="row" justify="space-between">
                <Button>Forgot password?</Button>
                <Button type="submit">Log in</Button>
              </Grid>
            </form>
          </CardContent>
        </Grid>
      </Card>
    </div>
  );
};
