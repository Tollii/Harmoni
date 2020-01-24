import React from "react";
import MaterialTable, { Column } from "material-table";
import Card from "../../components/Card/Card";

interface Row {
  ticket_name: string;
  price: number;
  ticket_amount: number;
  date_start: string;
  date_end: string;
}

interface TableState {
  columns: Array<Column<Row>>;
}

export default function Ticket(props: any){
  const state: TableState = {
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
    ]
  };

  return (
      <Card width='100%'>
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
                      resolve();
                      if (oldData) {
                        const data = [...props.tickets];
                        data[data.indexOf(oldData)] = newData;
                        props.handleChange(data, "tickets");
                      }
                    }, 600);
                  }),
              onRowDelete: oldData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      const data = [...props.tickets];
                      data.splice(data.indexOf(oldData), 1);
                      props.handleChange(data, "tickets");
                    }, 600);
                  })
            }}
        />
      </Card>

  );
};
