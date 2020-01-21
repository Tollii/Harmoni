import React, { constructor, useState, useCallback, useEffect } from "react";
import MaterialTable, { Column } from "material-table";

import Card from "../../components/Card/Card";
import {
  Grid,
  CardContent,
  makeStyles,
  Typography,
  Link,
  createStyles,
  Theme,
  Button
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import InputField from "../../components/InputField/InputField";
import { Add } from "@material-ui/icons";

interface Row {
  ticket_name: string;
  price: number;
  ticket_amount: number;
  date_start: string;
  date_end: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

export default (props: any) => {
  const [edited, setEdited] = useState(false);
  const [state, setState] = useState<TableState>({
    columns: [
      { title: "Name", field: "ticket_name" },
      { title: "Price", field: "price", type: "numeric" },
      { title: "Quantity", field: "ticket_amount", type: "numeric" },
      {
        title: "Release Date",
        field: "date_start",
        type: "datetime"
      },
      {
        title: "End date",
        field: "date_end",
        type: "datetime"
      }
    ],
    data: props.tickets
  });

  return (
    <MaterialTable
      title="Tickets"
      columns={state.columns}
      data={props.tickets}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...props.tickets];
              data.push(newData);
              props.handleChange(data, "tickets");
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              setEdited(true);
              resolve();
              if (oldData) {
                const data = [...props.tickets];
                console.log(data);
                data[data.indexOf(oldData)] = newData;
                props.handleChange(data, "tickets");
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              setEdited(true);
              resolve();
              const data = [...props.tickets];
              data.splice(data.indexOf(oldData), 1);
              props.handleChange(data, "tickets");
            }, 600);
          })
      }}
    />
  );
};
