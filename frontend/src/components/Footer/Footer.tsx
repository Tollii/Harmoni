import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Instagram, Twitter } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import FeedbackFrom from "../FeedbackForm/FeedbackFrom";

const useStyles = makeStyles({
  root: {
    maxWidth: "85%",
    textAlign: "center",
    margin: "auto",
    marginTop: "120px",
    zIndex: 9999,
  },
  icons: {
    margin: "20px auto"
  }
});

/**
 * Creates a footer
 * @returns returns a footer
 */
export default function Footer(){
  const classes = useStyles();
  return (
    <div className={classes.root} >
      <Typography variant="caption" align={"center"} color={"textSecondary"}>
        © Harmoni Copyright 2020
      </Typography>
      <Divider style={{ margin: "20px auto", width: 100 }} />
      <Grid container justify={"center"} spacing={1}>
        <Grid item xs={12} sm={3} md={2}>
          <Link align={"center"} href="#" color={"textSecondary"}>
            About Harmoni
          </Link>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Link align={"center"} href="#" color={"textSecondary"}>
            Site Map
          </Link>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Link align={"center"} href="#" color={"textSecondary"}>
            Terms & Conditions
          </Link>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Link align={"center"} href="#" color={"textSecondary"}>
            Contact us
          </Link>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <FeedbackFrom/>
        </Grid>
      </Grid>
      <Grid container justify="center" spacing={2} className={classes.icons}>
        <Grid item xs={8} sm={4} md={2}>
          <Link align={"center"} href="#" color={"textPrimary"}>
            <FacebookIcon />
          </Link>
        </Grid>
        <Grid item xs={8} sm={4} md={2}>
          <Link align={"center"} href="#" color={"textPrimary"}>
            <Instagram />
          </Link>
        </Grid>
        <Grid item xs={8} sm={4} md={2}>
          <Link align={"center"} href="#" color={"textPrimary"}>
            <Twitter />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};
