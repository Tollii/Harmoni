import React from "react";
import MaterialTable from "material-table";

export default (props: any) => {
  return (
    <MaterialTable
      onRowClick={(e: any, i: any) => {
        window.location.hash = "#/event/" + i.id;
      }}
      title="Event List"
      columns={props.state.columns}
      data={props.state.data}
    />
  );
};
