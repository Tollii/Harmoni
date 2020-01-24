import React, { useState, useEffect } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Calendar from "./Calendar";
import EventList from "./EventList";
import EventService from "../../service/events";
import Card from "../../components/Card/Card";
import { Event } from "../../service/interface";

export default function EventListTabs() {
  const [value, setValue] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    EventService.getEventsUnarchived().then((response: Event[]) => {
      setEvents(response);
    });
  }, []);

  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }

  return (
    <Card>
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
    </Card>
  );
}
