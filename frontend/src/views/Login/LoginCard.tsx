import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../components/Card/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputField from "../../components/InputField/InputField";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
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
      <Grid container justify="center">
        <CardContent>
          <Grid item direction="row">
            <Typography className={classes.title} variant="h3" align="center">
              Login
            </Typography>
          </Grid>

          <Grid item justify="center" direction="row">
            <InputField label="Email" type="text" />
          </Grid>
          <Grid item justify="center" direction="row">
            <InputField
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item direction="row">
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Grid>
        </CardContent>
      </Grid>
    </Card>
  );
}
