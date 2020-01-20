import React, { useState, useEffect } from "react";
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
import EventService from "../../service/events";

export default (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card style={{ width: "80%" }}>
      <CardContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={2} direction="row">
            <Grid item xs>
              <InputField
                name="name"
                label="Name"
                type="text"
                value={props.values.name}
                onChange={props.handleChange}
              />
              <InputField
                name="location"
                label="Location"
                type="text"
                value={props.values.location}
                onChange={props.handleChange}
              />
            </Grid>
            <Grid item xs>
              <KeyboardDatePicker
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
            <Grid item xs>
              <KeyboardTimePicker
                name="timeStart"
                margin="normal"
                id="time-picker"
                label="Start Time"
                value={props.values.timeStart}
                onChange={e => props.handleChange(e, "timeStart")}
              />
              <KeyboardTimePicker
                name="timeEnd"
                margin="normal"
                id="time-picker"
                label="End Time"
                value={props.values.timeEnd}
                onChange={e => props.handleChange(e, "timeEnd")}
              />
            </Grid>
          </Grid>
          <TextField
            name="description"
            value={props.values.description}
            onChange={props.handleChange}
            id="outlined-multiline"
            label="Description"
            multiline
            rows="4"
            variant="outlined"
            style={{ width: "100%" }}
          />

          <TextField
            name="personnel"
            value={props.values.personnel}
            onChange={props.handleChange}
            id="outlined-multiline"
            label="Personnel"
            multiline
            rows="4"
            variant="outlined"
            style={{ width: "100%", marginTop: "10px" }}
          />
          <Grid container direction="row" justify="center">
            <Grid item xs>
              <Typography variant="h6" style={{ marginTop: "20px" }}>
                Event header
              </Typography>
              <Input
                name="eventImage"
                type="file"
                onChange={(event: any) =>
                  props.handleChange(event.target.files[0], "eventImage")
                }
              ></Input>
              <Typography style={{ marginTop: "20px" }}>
                Valgt header: {props.values.eventImage.name}
              </Typography>
            </Grid>
            <Grid
              container
              xs
              justify="center"
              direction="column"
              alignItems="center"
            >
              <Grid item>
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
          </Grid>
        </MuiPickersUtilsProvider>
      </CardContent>
    </Card>
  );
};
