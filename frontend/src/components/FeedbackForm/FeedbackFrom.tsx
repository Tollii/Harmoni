import React from 'react';
import {
    Button,
    TextField,
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
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';

interface FeedbackOptionType {
    item: string;
}

const FeedbackItems1 = [
    {item: "Poor"},
    {item: "Fair"},
    {item: "Good"},
    {item: "Very good"},
];

const FeedbackItems2 = [
    {item: "Appearance"},
    {item: "Ease"},
    {item: "Navigation"},
    {item: "Technology"},
    {item: "Other..."},
];

const FeedbackItems3 = [
    {item: "Appearance"},
    {item: "It was confusing"},
    {item: "Others..."},
];

const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option: FeedbackOptionType) => option.item,
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            '& .MuiTextField-root': {
                margin: theme.spacing(3),
                width: '40vw',
            },
        },
        feedback: {
            fontSize: '1.2vw',
            marginLeft: '20px',
            paddingLeft: '10px',
        },
    }),
);

export default function(props: any) {
    const classes = useStyles();
    const defaultProps = {
        style: {
            marginTop: 0,
        },
    };
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
                            Email address (Optional)
                        </Typography>
                        <TextField
                            {...defaultProps}
                            autoFocus
                            margin="dense"
                            id="name"
                            label=""
                            type="email"
                            variant="outlined"
                            fullWidth
                        />
                        <Typography className={classes.feedback} variant="subtitle1" gutterBottom>
                            How well do you understand the website?
                        </Typography>
                        <Autocomplete
                            id="filter-demo"
                            options={FeedbackItems1}
                            getOptionLabel={option => option.item}
                            filterOptions={filterOptions}
                            renderInput={params => (
                                <TextField {...defaultProps} {...params} variant="outlined" fullWidth />
                            )}
                        />
                        <Typography className={classes.feedback} variant="subtitle1" gutterBottom>
                            what did you like the most about the website?
                        </Typography>
                        <Autocomplete
                            id="filter-demo"
                            options={FeedbackItems2}
                            getOptionLabel={option => option.item}
                            filterOptions={filterOptions}
                            renderInput={params => (
                                <TextField {...defaultProps} {...params} variant="outlined" fullWidth />
                            )}
                        />
                        <Typography className={classes.feedback} variant="subtitle1" gutterBottom>
                            what almost stopped you from using the website?
                        </Typography>
                        <Autocomplete
                            id="filter-demo"
                            options={FeedbackItems3}
                            getOptionLabel={option => option.item}
                            filterOptions={filterOptions}
                            renderInput={params => (
                                <TextField {...defaultProps} {...params} variant="outlined" fullWidth />
                            )}
                        />
                        <Typography className={classes.feedback} variant="subtitle1" gutterBottom>
                            Do you have any suggestion to make our website better?
                        </Typography>
                        <TextField
                            {...defaultProps}
                            autoFocus
                            id="outlined-multiline-static"
                            label=""
                            multiline
                            rows="4"
                            defaultValue=""
                            variant="outlined"
                        />
                    </form>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
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
