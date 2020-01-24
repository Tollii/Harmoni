import React from "react";
import Card from "../../components/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Typography, Button, Menu, MenuItem } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    datePicker: {
      width: "100%",
      marginTop: "20px"
    },
    textFieldS: {
      width: "100%",
      marginTop: "20px"
    },
    textFieldL: {
      width: "100%",
      marginTop: "20px"
    },
    grid: {
      marginTop: "20px"
    },
    file: {
      fontSize: "1.2vw"
    },
    header: {
      marginTop: "20px"
    }
  })
);

export default function General(props: any){
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card style={{ width: "100%" }}>
      <CardContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={2} direction="row">
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.textFieldS}
                name="name"
                label="Name"
                type="text"
                id="outlined-multiline"
                variant="outlined"
                value={props.values.name}
                onChange={props.handleChange}
              />
              <TextField
                className={classes.textFieldS}
                name="location"
                label="Location"
                type="text"
                id="outlined-multiline"
                variant="outlined"
                value={props.values.location}
                onChange={props.handleChange}
              />
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={6}
              spacing={4}
              style={{ marginTop: "0.8%" }}
              direction="column"
            >
              <Grid item>
                <KeyboardDateTimePicker
                  name="eventStart"
                  variant="inline"
                  ampm={false}
                  label="Event starts"
                  value={props.values.eventStart}
                  onChange={(e: any) => props.handleChange(e, "eventStart")}
                  onError={console.log}
                  disablePast
                  format="dd/MM/yyyy HH:mm"
                  autoOk={true}
                />
              </Grid>
              <Grid item>
                <KeyboardDateTimePicker
                  variant="inline"
                  ampm={false}
                  label="Event ends"
                  value={props.values.eventEnd}
                  onChange={(e: any) => props.handleChange(e, "eventEnd")}
                  onError={console.log}
                  disablePast
                  format="dd/MM/yyyy HH:mm"
                  autoOk={true}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textFieldL}
              name="description"
              value={props.values.description}
              onChange={props.handleChange}
              id="outlined-multiline"
              label="Description"
              multiline
              rows="4"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textFieldL}
              name="personnel"
              value={props.values.personnel}
              onChange={props.handleChange}
              id="outlined-multiline"
              label="Personnel"
              multiline
              rows="4"
              variant="outlined"
            />
          </Grid>

          <Grid className={classes.grid} container spacing={2} direction="row">
            <Grid item xs={12} md={12}>
              <Typography variant="h6" gutterBottom>
                Event header
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                className={classes.file}
                name="eventImage"
                type="file"
                variant="outlined"
                id="outlined-multiline"
                onChange={(event: any) =>
                  props.handleChange(event.target.files[0], "eventImage")
                }
              />
              <Typography
                className={classes.header}
                variant="subtitle1"
                gutterBottom
              >
                Selected header: {props.values.eventImage.name}
              </Typography>
            </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  style={{width: '100%'}}
                  name="volunteers"
                  label="Volunteers"
                  type="number"
                  id="outlined-multiline"
                  variant="outlined"
                  value={props.values.volunteers}
                  onChange={props.handleChange}
                />
              </Grid>

              <Grid item xs={12} md={4} justify='center'>
                <Button
                  style={{width: '100%', height:"56px"}}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  variant="outlined"
                  size="large"
                >
                  {props.values.eventTypeId === 0 ||
                  props.eventTypes === undefined
                    ? "Event Type"
                    : props.eventTypes.map((eventType: any) => {
                        if (props.values.eventTypeId === eventType.id) {
                          return eventType.event_type;
                        }
                        return null;
                      })}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {props.eventTypes.map((eventType: any, index: number) => (
                    <MenuItem
                      onClick={e => {
                        handleClose();
                        props.handleChange(eventType.id, "eventTypeId");
                      }}
                      key={index}
                    >
                      {eventType.event_type}
                    </MenuItem>
                  ))}
                </Menu>
              </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </CardContent>
    </Card>
  );
};
