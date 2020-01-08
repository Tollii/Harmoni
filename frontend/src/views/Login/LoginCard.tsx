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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();

  return (
    <Card width={"80%"} style={{ minWidth: "250px", maxWidth: "450px" }}>
      <Grid container className={classes.grid}>
        <CardContent>
          <Grid item justify="center" direction="row">
            <Typography className={classes.title} variant="h3" align="center">
              Login
            </Typography>
          </Grid>

          <InputField label="Email" type="text" />
          <InputField
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Grid container direction="row" justify="space-between">
            <Button>Forgot password?</Button>
            <Button>Log in</Button>
          </Grid>
        </CardContent>
      </Grid>
    </Card>
  );
}
