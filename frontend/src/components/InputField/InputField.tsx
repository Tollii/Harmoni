import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core";
import { RemoveRedEye } from "@material-ui/icons";

const useStyles = makeStyles({
  input: {
    borderRadius: 0,
    marginBottom: "30px",
    width: "100%"
  },
  notchedOutline: {
    borderRadius: 0
  },
  eye: {
    cursor: "pointer"
  }
});

/**
 * Opens an inputfield
 * @returns returns an inputfield
 */
export default function InputField(props: any){
  const classes = useStyles();

  if (props.label.includes("Password")) {
    return <PasswordInput
    label={props.label}
    {...props}
    />;
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
      type={passwordIsMasked ? "password" : "text"}
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <RemoveRedEye className={classes.eye} onClick={togglePasswordMask} />
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
