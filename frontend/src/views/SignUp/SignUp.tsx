import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SignUpCard from "./SignUpCard";

const useStyles = makeStyles({
  marginTop: {
    marginTop: "20px"
  }
});

export default function SignUp(){
  const classes = useStyles();

  return (
    <div className={classes.marginTop}>
      <SignUpCard />
    </div>
  );
};
