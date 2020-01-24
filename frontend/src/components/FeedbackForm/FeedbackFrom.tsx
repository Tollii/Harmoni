import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Link,
   TextField
} from '@material-ui/core';
import MailingService from "../../service/mailing";
import useForm from "../../service/Form/useForm";
import validateSignUp from "../../service/Form/Validate";

/**
 * Creates a feedback form
 * @returns returns a feedback form
 */
export default function FeedbackFrom(){
    const [open, setOpen] = React.useState(false);

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
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle style={{width: '40vh'}} id="form-dialog-title">Send us your Feedback!</DialogTitle>
                <DialogContent>
                    <TextField
                        style={{width: '40vh'}}
                        autoFocus
                        fullWidth
                        required
                        margin='dense'
                        id="name"
                        type="text"
                        multiline
                        rows="4"
                        variant="outlined"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions style={{justifyContent: 'center'}}>
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
