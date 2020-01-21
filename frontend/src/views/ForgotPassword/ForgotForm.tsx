import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../components/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputField from "../../components/InputField/InputField";
import Grid from "@material-ui/core/Grid";
import Button from "../../components/Button/Button";
import useForm from "../../service/Form/useForm";
import validateSignUp from "../../service/Form/Validate";
import mailingService from "../../service/mailing";

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

export default (props: any) => {
    const classes = useStyles(props);

    const { handleChange, handleSubmit, values } = useForm(
        submit,
        {
            email: "",
        },
        validateSignUp
    );

    function submit() {

        if(values.email) {
            console.log("Submitted form");
            mailingService.forgotMail(values.email).then((res: any) => res);

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
                        <InputField
                            name="email"
                            label="E-mail *"
                            type="text"
                            autoComplete="current-email"
                            value={values.password}
                            onChange={handleChange}
                        />
                        <Grid container direction="row" justify="space-between">
                            <Button type="submit">Submit</Button>
                        </Grid>
                    </form>
                </CardContent>
            </Grid>
        </Card>
    );
};
