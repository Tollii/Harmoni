import React, { useEffect } from "react";
import MaterialTable, { Column } from "material-table";

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
export default function EventList(props: any){
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: "Name", field: "name" },
      { title: "Start date", field: "startDate", type: "datetime" },
      { title: "End date", field: "endDate", type: "datetime" },
      { title: "Location", field: "location" }
    ],
    data: []
  });
  useEffect(() => {
    let temp: any = [];
    props.events.map((event: any) => {
      let start = String(event.event_start).substring(0, 10);
      let end = String(event.event_end).substring(0, 10);
      temp.push(
        createData(
          event.id,
          event.event_name,
          start,
          end,
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
};
