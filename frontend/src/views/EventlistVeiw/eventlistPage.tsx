import React from 'react';
import MaterialTable, { Column } from 'material-table';
import {Grid} from "@material-ui/core";

interface Row {
    title: string;
    time: string;
    location: string;
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

const handleClick = () => {
    console.log('clicked');
};

function createData(title: string, time: string, location: string) {
    return { title, time, location };
}

export default function (props: any) {
    const [state, setState] = React.useState<TableState>({
        columns: [
            { title: 'Title', field: 'title' },
            { title: 'Date', field: 'time' },
            { title: 'Location', field: 'location' },
        ],
        data: [
            createData('event1', 'startTime-endTime', 'location'),
            createData('event2', 'startTime-endTime', 'location'),
            createData('event3', 'startTime-endTime', 'location'),
        ],
    });

    return (
        <Grid container spacing={2} direction="row">
            <Grid item xs={1}/>
            <Grid item xs={10}>
                <MaterialTable
                    onRowClick={handleClick}
                    title="Event List"
                    columns={state.columns}
                    data={state.data}
                />
            </Grid>
            <Grid item xs={1}/>
        </Grid>
    );
}
