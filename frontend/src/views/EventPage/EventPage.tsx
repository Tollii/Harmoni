import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import EventService from "../../service/events";
import TicketService from "../../service/tickets";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Map from "../../components/Map/simpleMap";
import DropDownButton from "../../components/Button/DropDownButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import ContractService from "../../service/contracts";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons: {
      margin: "auto"
    },
    description: {
      margin: "10%",
      marginTop: 0,
      marginBottom: 0,
      fontSize: "15px",
      wordWrap: "break-word"
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
      justifyContent: "center",
      width: "100%"
    },
    image: {
      marginTop: "-5%",
      marginBottom: "-15%",
      width: "100%",
      maxHeight: "80em"
    },
    container: {
      height: "90vh",
      width: "100%"
    },
    map: {
      height: "20vw",
      width: "100%",
      position: "relative",
      marginBottom: "10px",
      [theme.breakpoints.down("xs")]: {
        height: "40vw"
      }
    },
    box: {
      borderRight: 1,
      [theme.breakpoints.down("xs")]: {
        borderRight: 0
      }
    },
    loadingIcon: {
      width: "100%",
      marginTop: "200px",
      display: "flex",
      justifyContent: "center"
    }
  })
);

export default function EventPage(props: any){
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const [values, setValues] = useState({
    id: 0,
    name: "",
    start: new Date(),
    end: new Date(),
    image: "",
    personnel: "",
    description: "",
    location: "",
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
    setTimeout(function() {
      EventService.getEvent(props.match.params.id).then((event: any) => {
        setValues({
          id: event.id,
          name: event.event_name,
          start: new Date(event.event_start),
          end: new Date(event.event_end),
          image: process.env.REACT_APP_API_URL + "/image/event/" + event.id,
          personnel: event.personnel,
          description: event.description,
          typeID: event.event_typeID,
          location: event.location
        });
      });
      TicketService.getEventTickets(props.match.params.id).then(
        (tickets: any) => {
          setTickets(tickets);
        }
      );
      EventService.getArtists(props.match.params.id).then((response: any) =>
        setArtists(response)
      );

      setLoaded(true);
    }, 1000);
  }, [props.match.params.id, props.user]);

  const [myContract, showContract] = useState(false);
  const [eventConnection, setEventConnection] = useState(false);
  useEffect(() => {
    if (props.user.roleID === 2 || props.user.roleID === 3) {
      ContractService.getContract(props.user.id, props.match.params.id).then(
        (contract: any) => {
          if (contract !== "") {
            setEventConnection(true);
            showContract(
              contract.contract !== null && contract.contract !== ""
            );
          } else {
            setEventConnection(false);
            showContract(false);
          }
        }
      );
    }
  }, [props.user, props.match.params.id]);

  if (loaded) {
    return (
      <div style={{ overflow: "hidden" }}>
        <Card className={classes.card} elevation={0}>
          <img
            className={classes.image}
            src={values.image}
            alt="Event header"
          ></img>
        </Card>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} style={{ height: "100%" }}>
            <Box>
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
              <Grid
                container
                direction="row"
                justify="space-between"
                className={classes.avatarIcons}
              >
                {artists.map((artist: any, index: number) => (
                  <Grid item>
                    <Avatar
                      style={{ marginLeft: "auto", marginRight: "auto" }}
                      alt={artist.username}
                      src={artist.picture}
                    />
                    <Typography>{artist.username}</Typography>
                  </Grid>
                ))}
              </Grid>
              {((props.user.roleID === 3 && eventConnection) ||
                props.user.roleID === 4) && (
                <div>
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
                </div>
              )}
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
          <Grid item sm={3} xs={12} style={{ margin: "10px" }}>
            <Typography
              className={classes.smallTitle}
              variant="h6"
              gutterBottom
            >
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
            <Typography
              className={classes.smallTitle}
              variant="h6"
              gutterBottom
            >
              Location:
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {values.location}
            </Typography>
            <div className={classes.map}>
              <a
                href={`https://www.google.com/maps/place/${values.location}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Map events={[values]} center={values} zoom={11} />
              </a>
            </div>
            <Grid container spacing={1} justify="center" alignItems="center">
              <DropDownButton
                event={props.match.params.id}
                user={props.user.id}
                eventConnection={eventConnection}
                myContract={myContract}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return (
      <div className={classes.loadingIcon}>
        <CircularProgress />
      </div>
    );
  }
};
