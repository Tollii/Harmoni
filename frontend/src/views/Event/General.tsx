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

export default (props: any) => {
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
                name="dateStart"
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                margin="normal"
                id="date-picker-inline"
                autoOk={true}
                label="Start Date"
                value={props.values.dateStart}
                onChange={e => props.handleChange(e, true)}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <KeyboardDatePicker
                name="dateEnd"
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                margin="normal"
                id="date-picker-inline"
                label="End Date"
                value={props.values.dateEnd}
                onChange={props.handleChange}
              />
            </Grid>
            <Grid item xs>
              <KeyboardTimePicker
                name="timeStart"
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={props.values.timeStart}
                onChange={props.handleChange}
              />
              <KeyboardTimePicker
                name="timeEnd"
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={props.values.timeEnd}
                onChange={props.handleChange}
              />
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid item xs>
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
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </CardContent>
    </Card>
  );
};
