import React, { useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import { Event } from "../../service/interface";

interface Row {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

function createData(
  id: number,
  name: string,
  s_date: Date,
  e_date: Date,
  location: string
) {
  return {
    id,
    title: name,
    startDate: s_date,
    endDate: e_date,
    location: location
  };
}
export default function EventList(props: { events: Event[] }) {
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: "Name", field: "title" },
      { title: "Start date", field: "startDate", type: "datetime" },
      { title: "End date", field: "endDate", type: "datetime" },
      { title: "Location", field: "location" }
    ],
    data: []
  });
  useEffect(() => {
    let temp: Row[] = [];
    props.events.map((event: Event) => {
      temp.push(
        createData(
          event.id,
          event.event_name,
          new Date(event.event_start),
          new Date(event.event_end),
          event.location
        )
      );
      return null;
    });
    setState(state => ({ ...state, data: temp }));
  }, [props.events]);

  return (
    <MaterialTable
      onRowClick={(e: any, i: any) => {
        window.location.hash = "#/event/" + i.id;
      }}
      title="Event List"
      columns={state.columns}
      data={state.data}
    />
  );
}
