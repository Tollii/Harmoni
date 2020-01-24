import React, { useState } from "react";
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
const useStyles = makeStyles({
  title: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "20px"
  },
  errormessage: {
    float: "right"
  },
  custom: {
    minWidth: "250px",
    maxWidth: "450px",
    marginTop: "20px",
    margin: "auto"
  },
  cardContent: {
    width: "400px",
    marginLeft: "1.5vw"
  },
  link: {
    color: "red",
    textDecoration: "none"
  }
});

export default function LoginCard(props: {logFunc:any}){
  const classes = useStyles();
  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    {
      email: "",
      password: ""
    },
    validateLogin
  );
  const [loginError, setError] = useState(false);

  function submit() {
    const pattern = /.+@[a-z1-9]+\.[a-z]+/;
    const check = values.email.match(pattern);

    if (check && values.password) {
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
          setError(true);
        });
    }
  }

  return (
    <div className={classes.custom}>
      <Card>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h3" align="center">
              Login
            </Typography>
          </Grid>
          <CardContent className={classes.cardContent}>
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
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
              />
              <div>
                {loginError ? (
                  <h4 className={classes.errormessage}>
                    Invalid email or password
                  </h4>
                ) : null}
              </div>

              <Grid container direction="row" justify="space-between">
                <Link className={classes.link} to="/forgot">
                  <Button>Forgot password?</Button>
                </Link>
                <Button type="submit">Log in</Button>
              </Grid>
            </form>
          </CardContent>
        </Grid>
      </Card>
    </div>
  );
};
