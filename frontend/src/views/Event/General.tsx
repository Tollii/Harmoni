import React from "react";
import Card from "../../components/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import InputField from "../../components/InputField/InputField";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Input, Typography, Button, Menu, MenuItem } from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      datePicker: {
        width: '250px',
        marginLeft: '20px'
      },
      textFieldS: {
        width: '250px',
        margin: '10px',
      },
      textFieldL: {
        width: '100%',
        marginTop: '20px',
      },
      grid: {
        marginTop: '20px',
      },
      file: {
        fontSize: '1.2vw',
      },
      header: {
        marginTop: '20px',
      },
  })
);

export default (props: any) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card style={{ width: "100%" }}>
      <CardContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>

          <Grid container spacing={2} direction="row">
            <Grid item xs={12} sm={9} md={4}>
              <TextField
                className={classes.textFieldS}
                name="name"
                label="Name"
                type="text"
                id="outlined-multiline"
                variant="outlined"
                value={props.values.name}
                onChange={props.handleChange}
              />
              <TextField
                className={classes.textFieldS}
                name="location"
                label="Location"
                type="text"
                id="outlined-multiline"
                variant="outlined"
                value={props.values.location}
                onChange={props.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={9} md={4} >
              <KeyboardDatePicker
                className={classes.datePicker}
                disableToolbar
                variant="inline"
                format="dd-MM-yyyy"
                margin="normal"
                id="date-picker-inline"
                autoOk={true}
                label="Start Date"
                value={props.values.dateStart}
                onChange={e => props.handleChange(e, "dateStart")}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <KeyboardDatePicker
                className={classes.datePicker}
                name="dateEnd"
                disableToolbar
                variant="inline"
                format="dd-MM-yyyy"
                margin="normal"
                id="date-picker-inline"
                autoOk={true}
                label="End Date"
                value={props.values.dateEnd}
                onChange={e => props.handleChange(e, "dateEnd")}
              />
            </Grid>
            <Grid item xs={12} sm={9} md={4}>
              <KeyboardTimePicker
                className={classes.datePicker}
                name="timeStart"
                margin="normal"
                id="time-picker"
                label="Start Time"
                value={props.values.timeStart}
                onChange={e => props.handleChange(e, "timeStart")}
              />
              <KeyboardTimePicker
                className={classes.datePicker}
                name="timeEnd"
                margin="normal"
                id="time-picker"
                label="End Time"
                value={props.values.timeEnd}
                onChange={e => props.handleChange(e, "timeEnd")}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textFieldL}
              name="description"
              value={props.values.description}
              onChange={props.handleChange}
              id="outlined-multiline"
              label="Description"
              multiline
              rows="4"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textFieldL}
              name="personnel"
              value={props.values.personnel}
              onChange={props.handleChange}
              id="outlined-multiline"
              label="Personnel"
              multiline
              rows="4"
              variant="outlined"
            />
          </Grid>

          <Grid className={classes.grid} container spacing={2} direction="row">

            <Grid item xs={12} md={12}>
              <Typography variant="h6" gutterBottom>
                Event header
              </Typography>
            </Grid>

            <Grid item xs={12} md={4} >
              <TextField
                className={classes.file}
                name="eventImage"
                type="file"
                variant="outlined"
                id="outlined-multiline"
                onChange={(event: any) =>
                    props.handleChange(event.target.files[0], "eventImage")
                }
              />
              <Typography className={classes.header} variant="subtitle1" gutterBottom>
                Selected header: {props.values.eventImage.name}
              </Typography>
            </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  style={{width: '100%'}}
                  name="volunteers"
                  label="Volunteers"
                  type="number"
                  id="outlined-multiline"
                  variant="outlined"
                  value={props.values.volunteers}
                  onChange={props.handleChange}
                />
              </Grid>

              <Grid item xs={12} md={4} justify='center'>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  {props.values.eventTypeId === 0 ||
                  props.eventTypes === undefined
                    ? "Event Type"
                    : props.eventTypes.map((eventType: any) => {
                        if (props.values.eventTypeId === eventType.id) {
                          return eventType.event_type;
                        }
                        return null;
                      })}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {props.eventTypes.map((eventType: any, index: number) => (
                    <MenuItem
                      onClick={e => {
                        handleClose();
                        props.handleChange(eventType.id, "eventTypeId");
                      }}
                      key={index}
                    >
                      {eventType.event_type}
                    </MenuItem>
                  ))}
                </Menu>
              </Grid>

            </Grid>
        </MuiPickersUtilsProvider>
      </CardContent>
    </Card>
  );
};
