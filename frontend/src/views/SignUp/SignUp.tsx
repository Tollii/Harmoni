import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid/Grid";
import { Box } from "@material-ui/core";
import Button from "../../components/Button/Button";
import SignUpCard from "./SignUpCard";

const useStyles = makeStyles({
  marginTop: {
    marginTop: "20px"
  }
});

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.marginTop}>
      <SignUpCard />
    </div>
  );
};

/*
 ellipse: {
    height: "100px",
    backgroundColor: "#f50057",
    borderTopRightRadius: "400px",
    borderTopLeftRadius: "400px",
    borderBottomRightRadius: "400px",
    borderBottomLeftRadius: "400px",
    bottom: 0
  },
  ellipse1: {
    borderRadius: 0,
    position: "absolute",
    width: "100%",
    zIndex: 1,
    marginLeft: 0,
    overflowX: "hidden"
  },
  ellipse2: {
    position: "absolute",
    width: "25%",
    zIndex: 2,
    marginLeft: "33%"
  },
  ellipse3: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    position: "absolute",
    width: "33%",
    zIndex: 3,
    right: 0
  },

<Box
          className={`${classes.ellipse} ${classes.ellipse1}`}
          boxShadow={10}
        />
        <Box
          className={`${classes.ellipse} ${classes.ellipse2}`}
          boxShadow={10}
        />
        <Box
          className={`${classes.ellipse} ${classes.ellipse3}`}
          boxShadow={10}
        />
        */
