import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../components/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputField from "../../components/InputField/InputField";
import Grid from "@material-ui/core/Grid";
import Button from "../../components/Button/Button";
import useForm from "../../service/Form/useForm";
import { validateEmail } from "../../service/Form/Validate";
import mailingService from "../../service/mailing";
import { useSnackbar } from "material-ui-snackbar-provider";

const useStyles = makeStyles({
  grid: {
    maxWidth: "450px",
    minWidth: "250px"
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "20px"
  },
  pos: {
    marginBottom: 12
  },
  notchedOutline: {
    borderRadius: 0
  }
});

export default function ForgotForm(props: any){
  const classes = useStyles(props);

  const { handleChange, handleSubmit, values } = useForm(
    submit,
    {
      email: ""
    },
    validateEmail
  );

  let errorsFeedback = "Email address is invalid";
  const [error, setError] = useState(false);

  const snackbar = useSnackbar();

  const handleUndo = () => {
    // *snip*
  };
  function submit() {
    if (!/\S+@\S+\.\S+/.test(values.email)) {
      setError(true);
    } else {
      mailingService.forgotMail(values.email).then((res: any) => res);
      window.location.hash = "#/login";
      snackbar.showMessage(
        "We will mail you a link to create a new password. Please check your mail",
        "Ok",
        () => handleUndo()
      );
    }
  }

  return (
    <Card width={"80%"} style={{ minWidth: "250px", maxWidth: "450px" }}>
      <Grid container className={classes.grid}>
        <CardContent>
          <Grid container justify="center" direction="row">
            <Typography className={classes.title} variant="h3" align="center">
              Reset Password
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit} noValidate>
            {error && <Typography color="error">{errorsFeedback}</Typography>}
            <InputField
              name="email"
              label="E-mail *"
              type="text"
              autoComplete="current-email"
              value={values.password}
              onChange={handleChange}
            />

            <Grid container direction="row" justify="space-between">
              <Button onClick={() => (window.location.hash = "#/login")}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </Grid>
          </form>
        </CardContent>
      </Grid>
    </Card>
  );
};
