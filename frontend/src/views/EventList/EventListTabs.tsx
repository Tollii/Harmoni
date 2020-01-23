import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Calendar from "./Calendar";
import EventList from "./EventList";
import EventService from "../../service/events";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

export default (props: any) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [events, setEvents] = useState([]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    EventService.getEventsUnarchived().then((response: any) => {
      setEvents(response);
      setValue(1);
      setValue(0);
    });
  }, []);

  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="List" {...a11yProps(0)} />
        <Tab label="Calendar" {...a11yProps(1)} />
      </Tabs>
      {value === 0 ? (
        <EventList events={events} />
      ) : (
        <Calendar events={events} />
      )}
    </Paper>
  );
};
