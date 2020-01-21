import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import ContractService from "../../service/contracts";
import Button from "../../components/Button/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import FileService from "../../service/files";
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
    }
  })
);
export default (props: any) => {
  const classes = useStyles();

  const [file, setFile] = useState(new File(["foo"], ""));

  const fileSelectedHandler = (event: any) => {
    setFile(event.target.files[0]);
  };
  const uploadContract = (userId: number) => {
    return Promise.resolve(
      FileService.postContracts(file, userId, props.match.params.eventId)
    );
  };

  const deleteContract = (userId: number) => {
    return Promise.resolve(
      FileService.postContracts(file, userId, props.match.params.eventId)
    );
  };
  const [users, setUsers] = useState([]);

  useEffect(() => {
    ContractService.getContractsByEvent(props.match.params.eventId).then(
      (res: any) => {
        setUsers(res);
      }
    );
  }, [props.match.params.eventId]);

  return (
    <div>
      {users.map((user: any, index: number) => (
        <Card key={index} style={{ width: "80%", marginTop: "20px" }}>
          <CardContent>
            <Typography>{user.username}</Typography>
            <Grid container direction="row" justify="center">
              <Paper className={classes.paper}>
                <Grid container direction="row">
                  <Button variant="contained" component="label">
                    Choose File
                    <input
                      type="file"
                      accept="application/pdf"
                      style={{ display: "none" }}
                      onChange={fileSelectedHandler}
                    />
                  </Button>
                  <Typography style={{ marginLeft: "30px" }}>
                    Chosen file: {file.name}
                  </Typography>
                </Grid>
              </Paper>
              <Button
                type="submit"
                onClick={() => {
                  uploadContract(user.id).then(() => {
                    setFile(new File(["foo"], ""));
                    window.location.reload();
                  });
                }}
              >
                Upload contract
              </Button>
            </Grid>
            <Grid container direction="row" justify="center">
              {user.Contracts[0].contract !== "" && (
                <Grid item xs={3}>
                  <Button
                    onClick={() =>
                      window.open(
                        process.env.REACT_APP_API_URL +
                          "/files/contract/user/" +
                          user.id +
                          "/event/" +
                          props.match.params.eventId,
                        "_blank"
                      )
                    }
                  >
                    View Contract
                  </Button>
                </Grid>
              )}
              <Grid item xs={3}>
                <Link
                  to={"/contract/event/" + props.match.params.eventId}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    onClick={() => {
                      deleteContract(user.id);
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
