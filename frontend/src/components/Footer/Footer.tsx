import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Instagram, Twitter } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    textAlign: "center",
    margin: "auto", 
    marginTop: "20px"
  },
  icons: {
    margin: "20px auto"
  }
});

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="caption" align={"center"} color={"textSecondary"}>
        © Harmoni Copyright 2019
      </Typography>
      <Divider style={{ margin: "20px auto", width: 100 }} />
      <Grid container justify={"center"} spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Link align={"center"} href="#" color={"textSecondary"}>
            About Harmoni
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Link align={"center"} href="#" color={"textSecondary"}>
            Site Map
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Link align={"center"} href="#" color={"textSecondary"}>
            Terms & Conditions
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Link align={"center"} href="#" color={"textSecondary"}>
            Contact us
          </Link>
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
        <Grid item xs={8} sm={4} md={2}>
          <Typography>
            Feedback:{" "}
            <Link href="mailto:person@example.com">harmoni@Yourevent.no</Link>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
