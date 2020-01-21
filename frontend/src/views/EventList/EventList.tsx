import React, { useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import { Grid } from "@material-ui/core";
import EventService from "../../service/events";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
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
      { title: "Start date", field: "startDate", type: "datetime" },
      { title: "End date", field: "endDate", type: "datetime" },
      { title: "Location", field: "location" },
      {
        title: "Event Page",
        field: "eventInfo",
        render: rowData => (
          <Link to={"/event/" + rowData.id} style={{ textDecoration: "none" }}>
            <Button>More info</Button>
          </Link>
        )
      }
    ],
    data: []
  });
  useEffect(() => {
    EventService.getEventsUnarchived().then((events: any) => {      
      Promise.all(
        events.map((event: any) => {
          let start = String(event.event_start).substring(0, 10);
          let end = String(event.event_end).substring(0, 10);
          return createData(
            event.id,
            event.event_name,
            start,
            end,
            event.location
          );
        })
      ).then((newData: any) => {
        setState(state => ({ ...state, data: newData }));
      });
    });
  }, []);
  return (
    <Grid container spacing={2} direction="row">
      <Grid item xs={1} />
      <Grid item sm={10} xs={12}>
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
