import React, { constructor, useState, useCallback, useEffect } from "react";
import Card from "../../components/Card/Card";
import {
  Grid,
  CardContent,
  makeStyles,
  Typography,
  Link,
  TextField,
  createStyles,
  Theme
} from "@material-ui/core";
import InputField from "../../components/InputField/InputField";
import { Add } from "@material-ui/icons";
import Button from "../../components/Button/Button";

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

export default function Ticket() {
  const classes = useStyles();

  const [numberOfTickets, setNumberOfTickets] = useState(1);

  return (
    <Card>
      <Grid item>
        <Typography className={classes.title} variant="h3" align="center">
          Tickets
        </Typography>
      </Grid>
      {Array(numberOfTickets)
        .fill("")
        .map(() => (
          <TicketRow />
        ))}
      <Typography>
        <Link
          component="button"
          variant="body2"
          onClick={() => setNumberOfTickets(numberOfTickets + 1)}
        >
          <Add className={classes.add} />
          Add ticket
        </Link>
      </Typography>
    </Card>
  );
}

function TicketRow() {
  const classes = useStyles();

  return (
    <CardContent>
      <Grid container spacing={1}>
        <Grid item className={classes.text}>
          Name
        </Grid>
        <Grid item className={classes.inputInputInput}>
          <InputField label="Name"></InputField>
        </Grid>
        <Grid item className={classes.text}>
          Price
        </Grid>
        <Grid item className={classes.inputInput}>
          <InputField label="Price"></InputField>
        </Grid>
        <Grid item className={classes.text}>
          Quantity
        </Grid>
        <Grid item className={classes.inputInput}>
          <InputField label="Quantity"></InputField>
        </Grid>
        <Grid item className={classes.text}>
          Start Time
        </Grid>
        <Grid item className={classes.inputInputInput}>
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local"
              label="Start Time"
              type="datetime-local"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
        </Grid>
        <Grid item className={classes.text}>
          End Time
        </Grid>
        <Grid item className={classes.inputInputInput}>
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local"
              label="End Time"
              type="datetime-local"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
        </Grid>
      </Grid>
    </CardContent>
  );
}
