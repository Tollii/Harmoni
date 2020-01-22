import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Link,
    createStyles,
    makeStyles,
    Theme,
    Typography
} from '@material-ui/core';
import MailingService from "../../service/mailing";
import InputField from "../InputField/InputField";
import useForm from "../../service/Form/useForm";
import validateSignUp from "../../service/Form/Validate";

interface FeedbackOptionType {
    item: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            '& .MuiTextField-root': {
                margin: theme.spacing(3),
                width: '20vw',
            },
        },
        feedback: {
            fontSize: '1.2vw',
            marginLeft: '20px',
            paddingLeft: '10px',
            marginRight: '20px',
            paddingRight: '10px',
        },
    }),
);

export default function(props: any) {
    const classes = useStyles();


    const submitButton = () => {
        MailingService.sendFeedback({
            text: values.text,
        });
        setOpen(false);
    };

    let submit = "";
    const { handleChange, values } = useForm(
        submit,
        {
            text: "",
        },
        validateSignUp
    );


    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    return (
        <div>
            <Link align={"center"} href="#" color={"textSecondary"} type='button' onClick={handleClickOpen}>
                Feedback
            </Link>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Send us your feedback!</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <form className={classes.form} noValidate autoComplete="off">
                        <Typography className={classes.feedback} variant="subtitle1" gutterBottom>
                            Feedback
                        </Typography>
                        <InputField
                            name="text"
                            label=""
                            type="text"
                            required={true}
                            onChange={handleChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitButton} color="primary">
                        Send
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
