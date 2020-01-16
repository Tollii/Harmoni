import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Typography
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  button: {
    textDecoration: "none"
  }
});

export default (props: any) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Event name</TableCell>
            <TableCell align="right">Event start</TableCell>
            <TableCell align="right">Event end</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">See your event</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.events.map((event: any) => (
            <TableRow key={event.id}>
              <TableCell component="th" scope="row">
                {event.event_name}
              </TableCell>
              <TableCell align="right">
                {new Date(event.event_start).toDateString().substring(0, 10) +
                  " " +
                  new Date(event.event_start).toTimeString().substring(0, 5)}
              </TableCell>
              <TableCell align="right">
                {new Date(event.event_end).toDateString().substring(0, 10) +
                  " " +
                  new Date(event.event_end).toTimeString().substring(0, 5)}
              </TableCell>
              <TableCell align="right">{event.location}</TableCell>
              <TableCell align="right">
                <Link className={classes.button} to={"event/" + event.id}>
                  <Button>See your event</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
