import React from "react";
import {Box, Button, Card, CardContent, Divider, Grid, List, ListItem, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        date: {
            fontSize: '1.5vw',
            textAlign: 'center',
        },
        detail: {
            fontSize: '1vw',
        },
        listItem: {
            margin: 0,
        },
        card: {
            width: "60%",
            height: "100px",
            paddingBottom: 0,
        },
})
);

 export default function EventlistCard (Props: any) {
    const classes = useStyles();
    return (
        <Box display="flex" borderBottom={1}>
                <Grid container spacing={2} direction="row">
                    <Grid item xs={2}>
                        <Typography className={classes.date} variant='h3' gutterBottom>
                            <p>JAN<br/>17</p>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={classes.detail} gutterBottom>
                            <p>Fre-17:30<br/>Fredagsbillett Interstate 20 - Oslo Americana Weekend
                            <br/>Cosmopolite - Oslo</p>
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography  variant='h3' gutterBottom>
                            <Button className={classes.detail} variant="contained" color="secondary">Buy Ticket</Button>
                        </Typography>
                    </Grid>
                </Grid>
        </Box>
    )
}
