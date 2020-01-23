import React, { useEffect, useCallback } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import EventService from "../../service/events";
import Profile from "./Profile";
import MyEvents from "./MyEvents";
import Card from "../../components/Card/Card";
import { Column } from "material-table";

interface Row {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

export default (props: any) => {
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: "Name", field: "name" },
      { title: "Start date", field: "startDate", type: "datetime" },
      { title: "End date", field: "endDate", type: "datetime" },
      { title: "Location", field: "location" }
    ],
    data: []
  });

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    props.setPage(newValue);
  };

  const createData = useCallback((events: any) => {
    let temp: any = [];
    events.map((event: any) => {
      let start = String(event.event_start).substring(0, 10);
      let end = String(event.event_end).substring(0, 10);
      temp.push({
        id: event.id,
        name: event.event_name,
        startDate: start,
        endDate: end,
        location: event.location
      });
      return null;
    });
    setState(state => ({ ...state, data: temp }));
  }, []);

  useEffect(() => {
    if (props.user.roleID !== 4) {
      EventService.getEventsByUser().then((response: any) => {
        if (response.length !== 0) {
          createData(response);
        }
      });
    } else {
      EventService.getEvents().then((response: any) => {
        if (response.length !== 0) {
          createData(response);
        }
      });
    }
  }, [props.user.roleID, createData]);

  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }

  return (
    <Card>
      <Tabs
        value={props.page}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Profile" {...a11yProps(0)} />
        <Tab label="My Events" {...a11yProps(1)} />
      </Tabs>
      {props.page === 0 ? (
        <Profile user={props.user} handleUserChange={props.handleUserChange} />
      ) : (
        <MyEvents state={state} />
      )}
    </Card>
  );
};
