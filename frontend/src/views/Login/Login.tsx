import React from "react";
import LoginCard from "./LoginCard";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "../../components/Button/Button";

const useStyles = makeStyles({
  marginTop: {
    marginTop: "20px"
  }
});

export default function Login(props: {logFunc:any}){
  const classes = useStyles();

  return (
    <div>
      <LoginCard logFunc={props.logFunc}/>
      <Grid container direction="row" justify="center">
        <Button
          className={classes.marginTop}
          onClick={() => (window.location.hash = "#/signUp")}
        >
          Not a user?
        </Button>
      </Grid>
    </div>
  );
};
