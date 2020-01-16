import React from "react";
import EventCard from "../../components/EventCard/EventCard";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
