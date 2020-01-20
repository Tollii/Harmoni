import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  Link,
  Typography,
  MenuProps,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles
} from "@material-ui/core/styles";
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
import DescriptionIcon from "@material-ui/icons/Description";
import SettingsIcon from "@material-ui/icons/Settings";
import DeleteIcon from "@material-ui/icons/Delete";
import AlertDialog from "../../components/AlertDialog/AlertDialog";
import Map from "../../components/Map/simpleMap";
import DropDownButton from "../../components/Button/DropDownButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons:{
      margin:"auto"
    },
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
      marginBottom: "10px"
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
    EventService.getEvent(props.match.params.id).then((event: any) => {
      setValues({
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const role: number = 2; /**Her skal Zaim sin supermetode inn */

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
            {values.location}
          </Typography>
          <div className={classes.map}>
            <Map events={[values]} center={values} zoom={11} />
          </div>
          <Grid container>
            <Grid className={classes.buttons}>
              <Button
                style={{ fontSize: "1.5vw" }}
                variant="contained"
                color="secondary"
              >
                Buy Ticket
              </Button>
            </Grid>
            <DropDownButton />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
