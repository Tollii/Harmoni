import React from "react";
import {Box, Button, Card, Grid, Link, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles ({
   image: {
       width: "1200px",
       height: "400px",
   },
    root: {
        flexGrow: 1,
    },
    p: {
        padding: theme.spacing(1),
        textAlign: 'left',
        color: 'black',
        fontSize: '1.5vw'
    },
    description: {
       padding: theme.spacing(5),
        fontSize: '1.5vw'
    },
    title: {
       textAlign: 'center',
        fontWeight: 'bold',
        fontSize: "5vw"
    },
    card: {
       height: '400px',
        marginBottom: '20px'
    },
    titre: {
       fontSize: '2vw'
    },
    link: {
        fontSize: '1.5vw',
        marginBottom: '20px'
    },
}));


export default (props: any) => {
    const classes = useStyles();
    const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                props.event.image
            </Card>
            <Grid container spacing={3}>
                <Grid item xs={8} style={{height: '100%'}}>
                    <Box borderRight={1}>
                        <Typography className={classes.title} variant='h2'>
                            props.event.title
                        </Typography>
                        <Typography className={classes.description} variant="subtitle1" gutterBottom>
                            props.event.description
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={3} style={{margin: '10px'}}>
                    <Typography className={classes.titre} variant="h6" gutterBottom>
                        Date & Time:
                    </Typography>
                    <Typography className={classes.p} variant="subtitle1" gutterBottom>
                        <p>
                            Start date: props.event.startDate
                        </p>
                        <p>
                            End date: props.event.endDate
                        </p>
                        <p>
                            Start time: props.event.startTime
                        </p>
                        <p>
                            End time: props.event.endTime
                        </p>
                    </Typography>
                    <div className={classes.link}>
                        <Link href="#" onClick={preventDefault}>
                            Add to calender
                        </Link>
                    </div>
                    <Typography  className={classes.titre} variant="h6" gutterBottom>
                        Location:
                    </Typography>
                    <Typography className={classes.p} variant="subtitle1" gutterBottom>
                        props.event.location
                    </Typography>
                    <div className={classes.link}>
                        <Link href="#" onClick={preventDefault}>
                            View map
                        </Link>
                    </div>
                    <div>
                        <Button style={{fontSize: '1.5vw'}} variant="contained" color="secondary">
                            Buy Ticket
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}