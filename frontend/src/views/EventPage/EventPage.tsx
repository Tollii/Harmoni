import React, { useEffect, useState } from "react";
import { Box, Button, Card, Grid, Link, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import EventService from "../../service/events";
import TicketService from "../../service/tickets";
import ContractService from "../../service/contracts";
import UserService from "../../service/users";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      // padding: theme.spacing(5),
      margin: "10%",
      marginTop: 0,
      marginBottom: 0,
      fontSize: "15px"
    },
    title: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "5vw"
    },
    smallTitle: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "20px"
    },
    card: {
      width: "100%",
      marginBottom: "20px",
      padding: 0
    },
    table: {
      minWidth: 650
    },
    avatarIcons: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1)
      },
      justifyContent: "center"
    },
    image: {
      marginTop: "-5%",
      marginBottom: "-15%",
      width: "100%",
      maxHeight: "40%"
    }
  })
);

export default (props: any) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    start: new Date(),
    end: new Date(),
    image: "",
    personnel: "",
    description: "",
    typeID: 0
  });
  const [tickets, setTickets] = useState<
    Array<{
      id: number;
      ticket_name: string;
      price: number;
      ticket_amount: number;
      date_start: Date;
      date_end: Date;
    }>
  >([]);
  const [artists, setArtists] = useState<any>([]);

  useEffect(() => {
    console.log("hallla");
    EventService.getEvent(props.match.params.id).then((event: any) => {
      setValues({
        name: event.event_name,
        start: new Date(event.event_start),
        end: new Date(event.event_end),
        image: event.event_image,
        personnel: event.personnel,
        description: event.description,
        typeID: event.event_typeID
      });
    });
    TicketService.getEventTickets(props.match.params.id).then(
      (tickets: any) => {
        setTickets(tickets);
      }
    );
    let artists: any = [];
    UserService.getAllUsers().then((allUsers: any) => {
      console.log(allUsers);
      ContractService.getContracts().then((allContracts: any) => {
        console.log(allContracts);
        allContracts
          .filter(
            (contract: any) =>
              contract.eventID === parseInt(props.match.params.id)
          )
          .map((contract: any) => {
            artists.push(
              allUsers.find((user: any) => user.id === contract.userID)
            );
          });
        setArtists(artists);
      });
    });
  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
      <Card className={classes.card} elevation={0}>
        <img className={classes.image} src={values.image}></img>
      </Card>
      <Grid container spacing={3}>
        <Grid item xs={8} style={{ height: "100%" }}>
          <Box borderRight={1}>
            <Typography className={classes.title} variant="h2">
              {values.name}
            </Typography>
            <Typography
              className={classes.description}
              variant="subtitle1"
              gutterBottom
            >
              {values.description}
            </Typography>
            <Typography className={classes.smallTitle} variant="h6">
              Artists
            </Typography>
            <div className={classes.avatarIcons}>
              {artists.map((artist: any, index: number) => (
                <div>
                  <Avatar alt={artist.username} src={artist.picture} />
                  {artist.username}
                </div>
              ))}
            </div>
            <Typography className={classes.smallTitle} variant="h6">
              Personnel
            </Typography>
            <Typography
              className={classes.description}
              variant="subtitle1"
              gutterBottom
            >
              {values.personnel}
            </Typography>
            <Typography className={classes.smallTitle} variant="h6">
              Tickets
            </Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Ticket Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Post Date</TableCell>
                    <TableCell align="right">Removed Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tickets.map((ticket, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {ticket.ticket_name}
                      </TableCell>
                      <TableCell align="right">{ticket.price}</TableCell>
                      <TableCell align="right">
                        {ticket.ticket_amount}
                      </TableCell>
                      <TableCell align="right">
                        {new Date(ticket.date_start).toDateString()}
                      </TableCell>
                      <TableCell align="right">
                        {new Date(ticket.date_end).toDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item xs={3} style={{ margin: "10px" }}>
          <Typography className={classes.smallTitle} variant="h6" gutterBottom>
            Date & Time:
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <p>
              <strong>Event starts: </strong>
              {values.start.toDateString().substring(0, 10) +
                " " +
                values.start.toTimeString().substring(0, 5)}
            </p>
            <p>
              <strong>End date: </strong>
              {values.end.toDateString().substring(0, 10) +
                " " +
                values.end.toTimeString().substring(0, 5)}
            </p>
          </Typography>
          <Link href="#">Add to calender</Link>
          <Typography className={classes.smallTitle} variant="h6" gutterBottom>
            Location:
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            props.event.location
          </Typography>
          <Link href="#">View map</Link>
          <div>
            <Button
              style={{ fontSize: "1.5vw" }}
              variant="contained"
              color="secondary"
            >
              Buy Ticket
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
