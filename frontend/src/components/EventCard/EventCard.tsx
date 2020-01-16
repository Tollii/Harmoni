import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import {
  fade,
  Theme,
  createStyles,
  Link,
  Button,
  Grid,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: "400px",
      backgroundColor: "#ffffff",
      margin: "12px",
      marginBottom: "12px"
    },
    image: {
      transform: "scale(1)",
      "&:hover": {
        transform: "scale(1.1)",
        backgroundColor: fade(theme.palette.common.white, 0.15)
      }
    },
    content: {
      fontSize: "20px",
      color: "black",
      alignItems: "rtl",
      backgroundColor: "white"
    },
    title: {
      color: "black",
      textAlign: "center"
    }
  })
);

export default function EventCard(props: any) {
  const classes = useStyles();
  var date = new Date(props.event.event_start);
  return (
    <NavLink
      to={"/event/" + props.event.id}
      style={{ textDecoration: "none", margin: "auto" }}
    >
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.image}
            component="img"
            height="160"
            image={props.event.event_image}
            title={props.event.event_name}
          />

          <CardContent>
            <Grid container spacing={6} direction="row" justify="space-evenly">
              <Grid style={{ textAlign: "left", right: "0%" }}>
                <h1>{props.event.event_name}</h1>
              </Grid>
              <Grid style={{ textAlign: "right", marginTop: "2%" }}>
                <h3>
                  {date.toDateString().substring(0, 3) +
                    " " +
                    date.toDateString().substring(7, 10) +
                    ". " +
                    date.toDateString().substring(4, 7) +
                    " "}
                </h3>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </NavLink>
  );
}
