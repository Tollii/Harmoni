import React from "react";
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
      backgroundColor: "#E5E5E5",
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
    link: {
      fontSize: "20px"
    },
    title: {
      color: "black",
      textAlign: "center"
    }
  })
);

export default function EventCard(props: any) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.image}
          component="img"
          height="160"
          image={require("../../assets/img/festival.jpeg")}
          title={props.event_name}
        />

        <CardContent>
          <Grid container spacing={6}></Grid>

          <Grid item>
            <Button className={classes.content}>Jan 20</Button>
          </Grid>
          <Grid item>
            <Typography className={classes.title} onChange={props.handleChange}>
              {props.event_name}
            </Typography>
          </Grid>
          <Grid item>
            <Link color="primary" className={classes.link}>
              More Information
            </Link>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
