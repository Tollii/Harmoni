import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import ContractService from "../../service/contracts";
import Button from "../../components/Button/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Tabs,
  Tab,
  Box
} from "@material-ui/core";
import FileService from "../../service/files";

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
      width: "500px"
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

  const [openEditContract, setOpenEditContract] = React.useState(false);
  const [file, setFile] = useState(new File(["foo"], ""));
  const [contractUrl, setContractUrl] = useState("");

  const handleOpenEditContract = () => {
    setOpenEditContract(true);
  };

  const handleCloseEditContract = () => {
    setOpenEditContract(false);
    setFile(new File(["foo"], ""));
    window.location.reload();
  };

  const fileSelectedHandler = (event: any) => {
    setFile(event.target.files[0]);
  };
  const uploadContract = () => {
    return Promise.resolve(
      FileService.postContracts(
        file,
        props.match.params.userId,
        props.match.params.eventId
      )
    );
  };

  useEffect(() => {
    setContractUrl(
      "http://localhost:8080/files/contract/user/" +
        props.match.params.userId +
        "/event/" +
        props.match.params.eventId
    );
    console.log("Henter kontrakt");
  }, []);

  return (
    <Card style={{ width: "80%" }}>
      <CardContent>
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
        </Grid>
        <Grid container direction="row" justify="center">
          <Grid item xs={3}>
            <Button onClick={() => window.open(contractUrl, "_blank")}>
              View Contract
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              type="submit"
              onClick={() => {
                uploadContract().then(() => {
                  console.log("klikk");
                  handleCloseEditContract();
                });
              }}
            >
              Upload contract
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
