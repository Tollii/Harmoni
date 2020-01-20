import React, { useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import { Grid } from "@material-ui/core";
import EventService from "../../service/events";
interface Row {
  title: string;
  startDate: string;
  endDate: string;
  location: string;
}
interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}
const handleClick = (id: number) => {
  window.location.hash = "event/" + id;
};
function createData(
  id: number,
  name: string,
  s_date: string,
  e_date: string,
  location: string
) {
  return {
    id,
    name: name,
    startDate: s_date,
    endDate: e_date,
    location: location
  };
}
export default function(props: any) {
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: "Name", field: "name" },
      { title: "Start date", field: "startDate" },
      { title: "End date", field: "endDate" },
      { title: "Location", field: "location" }
    ],
    data: []
  });
  useEffect(() => {
    EventService.getEvents().then((events: any) => {
      Promise.all(
        events.map((event: any) => {
          const start = new Date(event.event_start).toDateString();
          const end = new Date(event.event_end).toDateString();
          return createData(
            event.id,
            event.event_name,
            start,
            end,
            event.location
          );
        })
      ).then((newData: any) => {
        setState({ ...state, data: newData });
      });
    });
  }, []);
  return (
    <Grid container spacing={2} direction="row">
      <Grid item xs={1} />
      <Grid item xs={10}>
        <MaterialTable
          onRowClick={(e: any) => {}}
          title="Event List"
          columns={state.columns}
          data={state.data}
        />
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
}
