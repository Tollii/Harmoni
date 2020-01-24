import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: "24px",
      padding: "20px"
    },
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary,
      width: "100%"
    },
    editPic: {
      fontSize: "12px",
      "&:hover": {
        cursor: "pointer"
      }
    },
    button: {
      fontSize: "1.5vw",
      color: "black",
      borderColor: "black"
    },
    rowButton: {
      fontSize: "1.3vw",
      marginTop: "20px",
      marginLeft: "10px"
    },
    name: {
      fontSize: "2vw",
      fontWeight: "bold",
      marginBottom: "20px"
    },
    file: {
      marginLeft: "30px",
      fontSize: "1.5vw",
      marginTop: "10px"
    }
  })
);

interface ContractCard{
  user: any;
  index: number;
  uploadContract: any;
  eventId: number;
  deleteContract: any;
}
export default function ContractCard(props: ContractCard){
  const classes = useStyles();

  const [file, setFile] = useState(new File(["foo"], ""));

  const fileSelectedHandler = (event: any) => {
    setFile(event.target.files[0]);
  };
  const [myContract, showContract] = useState(false);

  useEffect(() => {
    if (props.user.Contracts[0] !== "") {
      if (props.user.Contracts[0].contract !== null) {
        if (props.user.Contracts[0].contract !== "") showContract(true);
      }
    }
  }, [myContract, props.user.Contracts]);
  return (
    <div>
      <Card key={props.index} style={{ width: "80%", marginTop: "20px" }}>
        <CardContent>
          <Typography className={classes.name} variant="h4" gutterBottom>
            {props.user.username}
          </Typography>
          <Grid container direction="row" justify="center">
            <Paper className={classes.paper}>
              <Grid container direction="row">
                <Button
                  className={classes.button}
                  variant="outlined"
                  component="label"
                >
                  Choose File
                  <input
                    type="file"
                    accept="application/pdf"
                    style={{ display: "none" }}
                    onChange={fileSelectedHandler}
                  />
                </Button>
                <Typography className={classes.file}>
                  Chosen file: {file.name}
                </Typography>
              </Grid>
            </Paper>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={4}>
                <Button
                  className={classes.rowButton}
                  type="submit"
                  onClick={() => {
                    props.uploadContract(props.user.id, file).then(() => {
                      setFile(new File(["foo"], ""));
                      window.location.reload();
                    });
                  }}
                >
                  Upload contract
                </Button>
              </Grid>
              {myContract && (
                <Grid item xs={4}>
                  <Button
                    className={classes.rowButton}
                    onClick={() =>
                      window.open(
                        process.env.REACT_APP_API_URL +
                          "/files/contract/user/" +
                          props.user.id +
                          "/event/" +
                          props.eventId,
                        "_blank"
                      )
                    }
                  >
                    View Contract
                  </Button>
                </Grid>
              )}
              <Grid item xs={4}>
                <Link
                  to={"/contract/event/" + props.eventId}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    className={classes.rowButton}
                    onClick={() => {
                      props.deleteContract(props.user.id, file);
                      setTimeout(function() {
                        window.location.reload(false);
                      }, 1000);
                    }}
                  >
                    Delete Contract
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};
