import React from "react";
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
import DropDownButton from "../../components/Button/DropDownButton";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  link: {
    textDecoration: "none"
  }
});

const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
  window.location.hash = "event/" + id;
};

export default (props: any) => {
  const classes = useStyles(props);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Event name</TableCell>
            <TableCell align="right">Event start</TableCell>
            <TableCell align="right">Event end</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Settings</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.events.map((event: any) => (
            <TableRow key={event.id} hover selected={event.archived}>
              <TableCell
                component="th"
                scope="row"
                onClick={e => handleClick(e, event.id)}
              >
                {event.event_name}
              </TableCell>

              <TableCell align="right" onClick={e => handleClick(e, event.id)}>
                {new Date(event.event_start).toDateString().substring(0, 10) +
                  " " +
                  new Date(event.event_start).toTimeString().substring(0, 5)}
              </TableCell>
              <TableCell align="right" onClick={e => handleClick(e, event.id)}>
                {new Date(event.event_end).toDateString().substring(0, 10) +
                  " " +
                  new Date(event.event_end).toTimeString().substring(0, 5)}
              </TableCell>
              <TableCell align="right" onClick={e => handleClick(e, event.id)}>
                {event.location}
              </TableCell>
              <TableCell align="right">
                <DropDownButton user={props.user} event={event.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
