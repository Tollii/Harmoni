import React, { constructor, useState, useCallback, useEffect } from "react";
import Card from "../../components/Card/Card";
import {
  Grid,
  CardContent,
  makeStyles,
  Typography,
  Link,
  createStyles,
  Theme
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import InputField from "../../components/InputField/InputField";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputInput: {
      width: "90px"
    },
    inputInputInput: {
      width: "130px"
    },
    title: {
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: "20px"
    },
    backgroundCard: {
      backgroundColor: "#C0C0C0"
    },
    text: {
      marginTop: "20px"
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    },
    add: {
      fontSize: "13px"
    }
  })
);

export default function Ticket(props: any) {
  const classes = useStyles();

  function deleteTicket() {
    props.tickets.pop();
    props.handleChange(props.tickets, "tickets");
  }

  function addTicket() {
    let newTicket = {
      id: props.tickets.length,
      ticket_name: "",
      price: 0,
      ticket_amount: 0,
      date_start: new Date(),
      date_end: new Date()
    };
    props.tickets.push(newTicket);
    props.handleChange(props.tickets, "tickets");
  }

  return (
    <Card>
      <Grid item>
        <Typography className={classes.title} variant="h3" align="center">
          Tickets
        </Typography>
      </Grid>
      {props.tickets.map((ticket: any, index: number) => (
          <TicketRow
            tickets={props.tickets}
            key={index}
            id={index}
            handleChange={props.handleChange}
          />

      ))}
      <Typography>
        <Link component="button" variant="body2" onClick={deleteTicket}>
          <Add className={classes.add} />
          Delete ticket
        </Link>
      </Typography>
        <Typography>
        <Link component="button" variant="body2" onClick={addTicket}>
          <Add className={classes.add} />
          Add ticket
        </Link>
      </Typography>
    </Card>
  );
}

const TicketRow = (props: any) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    ticket_name: "",
    price: 0,
    ticket_amount: 0,
    date_start: new Date(),
    date_end: new Date()
  });

  useEffect(() => {
    let ticket = props.tickets.find((ticket: any) => ticket.id === props.id);
    if (ticket !== undefined) {
      setValues({
        ticket_name: ticket.ticket_name,
        price: ticket.price,
        ticket_amount: ticket.ticket_amount,
        date_start: ticket.date_start,
        date_end: ticket.date_end
      });
    }
  }, []);

  useEffect(() => {
    let ticketsArray = props.tickets.filter(
      (ticket: any) => ticket.id !== props.id
    );
    ticketsArray.push({
      id: props.id,
      ticket_name: values.ticket_name,
      price: values.price,
      ticket_amount: values.ticket_amount,
      date_start: values.date_start,
      date_end: values.date_end
    });
    props.handleChange(ticketsArray, "tickets");
  }, [values]);

  const handleChange = (event: any, name: string = "") => {
    if (name === "") {
      const { name, value } = event.target;
      setValues({ ...values, [name]: value });
    } else {
      setValues(values => ({ ...values, [name]: event }));
    }
  };

  return (
    <CardContent>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={1}>
          <Grid item className={classes.text}>
            Name
          </Grid>
          <Grid item className={classes.inputInputInput}>
            <InputField
              label="Name"
              name="ticket_name"
              value={values.ticket_name}
              onChange={handleChange}
            ></InputField>
          </Grid>
          <Grid item className={classes.text}>
            Price
          </Grid>
          <Grid item className={classes.inputInput}>
            <InputField
              label="Price"
              name="price"
              value={values.price}
              onChange={handleChange}
            ></InputField>
          </Grid>
          <Grid item className={classes.text}>
            Quantity
          </Grid>
          <Grid item className={classes.inputInput}>
            <InputField
              label="Quantity"
              name="ticket_amount"
              value={values.ticket_amount}
              onChange={handleChange}
            ></InputField>
          </Grid>
          <Grid item xs>
            <KeyboardDatePicker
              name="date_start"
              disableToolbar
              variant="inline"
              format="yyyy-MM-dd"
              margin="normal"
              id="date-picker-inline"
              autoOk={true}
              label="Start Date"
              value={values.date_start}
              onChange={e => handleChange(e, "date_start")}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
          <Grid item xs>
            <KeyboardDatePicker
              name="date_end"
              disableToolbar
              variant="inline"
              format="yyyy-MM-dd"
              margin="normal"
              id="date-picker-inline"
              label="End Date"
              value={values.date_end}
              onChange={e => handleChange(e, "date_end")}
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </CardContent>
  );
};
