import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import General from "./General";
import Artist from "./Artist";
import Ticket from "./Ticket";
import Rider from "./Rider";
import EventService from "../../service/events";
import UserService from "../../service/users";
import RiderTypeService from "../../service/rider_types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    backButton: {
      marginRight: theme.spacing(1)
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })
);

function getSteps() {
  return ["General", "Artist(s)", "Tickets", "Rider"];
}

function getStepContent(stepIndex: number, values: any, handleChange: any) {
  switch (stepIndex) {
    case 0:
      return <General values={values} handleChange={handleChange} />;
    case 1:
      return <Artist values={values} handleChange={handleChange} />;
    case 2:
      return <Ticket />;
    case 3:
      return <Rider values={values} handleChange={handleChange} />;
    default:
      return "Unknown stepIndex";
  }
}

interface Values {
  name: string;
  description: string;
  location: string;
  timeStart: Object;
  timeEnd: Object;
  dateStart: Object;
  dateEnd: Object;
  personnel: string;
  eventTypeId: number;
  artists: Array<{ id: number; name: string; email: string; checked: boolean }>;
  riderTypes: Array<{ id: number; description: string }>;
  riders: Array<{ additions: string; riderTypeID: number; userID: number }>;
  tickets: Array<{
    ticket_name: string;
    price: number;
    ticket_amount: number;
    date_start: string;
    date_end: string;
  }>;
}

export default () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  // States for posting event
  const [values, setValues] = useState<Values>({
    name: "",
    description: "",
    location: "",
    timeStart: new Date(),
    timeEnd: new Date(),
    dateStart: new Date(),
    dateEnd: new Date(),
    personnel: "",
    eventTypeId: 0,
    artists: [],
    riderTypes: [],
    riders: [],
    tickets: []
  });

  useEffect(() => {
    UserService.getArtist().then(response => {
      response.map((artist: any) => {
        values.artists.push({
          id: artist.id,
          name: artist.username,
          email: artist.email,
          checked: false
        });
      });
    });
    RiderTypeService.getRider_Types().then((response: any) => {
      setValues(prevState => {
        return { ...prevState, riderTypes: response };
      });
    });
  }, []);

  const handleChange = (event: any, name: string = "") => {
    if (name === "") {
      const { name, value } = event.target;
      setValues({ ...values, [name]: value });
    } else {
      setValues(values => ({ ...values, [name]: event }));
    }
  };

  const submit = () => {
    console.log("trying to post event");
    let eventStart = values.dateStart + "T" + values.timeStart + "Z";
    let eventEnd = values.dateEnd + "T" + values.timeEnd + "Z";
    let artists: number[] = [];
    values.artists.map(artist => {
      artists.push(artist.id);
    });
    let riders: Array<{
      riderTypeID: number;
      userID: number;
      additions: string;
    }> = [];
    values.riders.map(rider => {
      if (artists.includes(rider.userID)) {
        riders.push(rider);
      }
    });
    let event = {
      event_name: values.name,
      location: values.location,
      event_start: eventStart,
      event_end: eventEnd,
      personnel: values.personnel,
      description: values.description,
      event_typeID: values.eventTypeId,
      artists: artists,
      riders: values.riders,
      tickets: values.tickets
    };
    EventService.postEvent(event)
      .then((response: any) => {
        console.log("Poster event");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep, values, handleChange)}
            </Typography>
            <div>
              <Grid container justify="center">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={
                    activeStep === steps.length - 1 ? submit : handleNext
                  }
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Grid>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
