import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../components/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputField from "../../components/InputField/InputField";
import Grid from "@material-ui/core/Grid";
import Button from "../../components/Button/Button";

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

export default (props: any) => {
  const [values, setValues] = useState({
    email: "email",
    emailConfirmed: "emailConfirmed",
    password: "password",
    passwordConfirmed: "passwordConfirmed",
    fullName: "fullName",
    telephone: "telephone"
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    console.log(event.target.name);
    console.log(event.target.value);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    submit();
  };
  function submit() {
    console.log("Submitted");
  }

  const classes = useStyles();

  return (
    <Card width={"80%"} style={{ minWidth: "250px", maxWidth: "450px" }}>
      <Grid container className={classes.grid}>
        <CardContent>
          <Grid container justify="center" direction="row">
            <Typography className={classes.title} variant="h3" align="center">
              Sign up
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit} noValidate>
            <InputField
              name="email"
              label="Email"
              type="text"
              required={true}
              onChange={handleChange}
            />
            <InputField
              name="emailConfirmed"
              label="Confirm email"
              type="text"
              required={true}
              onChange={handleChange}
            />
            <InputField
              name="password"
              label="Password *"
              type="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <InputField
              name="passwordConfirmed"
              label="Confirm password *"
              type="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <InputField
              name="name"
              label="Full name"
              type="text"
              required={true}
              onChange={handleChange}
            />
            <InputField
              name="telephone"
              label="Telephone"
              type="text"
              required={true}
              onChange={handleChange}
            />
            <Grid container direction="row" justify="space-between">
              <Button>Already have a user?</Button>
              <Button type="submit">Sign up</Button>
            </Grid>
          </form>
        </CardContent>
      </Grid>
    </Card>
  );
};
