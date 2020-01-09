import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { InputAdornment, withStyles } from "@material-ui/core";
import { RemoveRedEye } from "@material-ui/icons";

const useStyles = makeStyles({
  input: {
    borderRadius: 0,
    marginBottom: "30px",
    width: "100%"
  },
  notchedOutline: {
    borderRadius: 0
  }
});

export default (props: any) => {
  const classes = useStyles();

  if (props.type === "password") {
    return <PasswordInput label={props.label} />;
  } else {
    return (
      <TextField
        className={classes.input}
        {...props}
        variant="outlined"
        InputProps={{
          classes: {
            notchedOutline: classes.notchedOutline
          }
        }}
      />
    );
  }
};

function PasswordInput(props: any) {
  const classes = useStyles();
  const [passwordIsMasked, setPasswordIsMasked] = useState(true);

  const togglePasswordMask = () => {
    setPasswordIsMasked(!passwordIsMasked);
  };

  return (
    <TextField
      className={classes.input}
      {...props}
      type={passwordIsMasked ? "password" : "text"}
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <RemoveRedEye className={props.eye} onClick={togglePasswordMask} />
          </InputAdornment>
        ),
        classes: {
          notchedOutline: classes.notchedOutline
        }
      }}
      variant="outlined"
    />
  );
}