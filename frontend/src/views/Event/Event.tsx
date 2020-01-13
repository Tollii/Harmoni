import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import General from "./General";
import Artist from "./Artist";

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
      return <Artist />;
    case 2:
      return <Ticket />;
    default:
      return "Unknown stepIndex";
  }
}

export default () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  // States for posting event
  const [values, setValues] = useState({
    name: "",
    description: "",
    location: "",
    timeStart: new Date(),
    timeEnd: new Date(),
    dateStart: new Date(),
    dateEnd: new Date()
  });

  const handleChange = (event: any, date: boolean = false) => {
    const { name, value } = event.target;
    if (!date) {
      setValues({ ...values, [name]: value });
    } else {
      setValues({ ...values, [name]: event });
    }
  };

  const listInfo = () => {
    console.log(values.name);
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
                  onClick={handleNext}
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
