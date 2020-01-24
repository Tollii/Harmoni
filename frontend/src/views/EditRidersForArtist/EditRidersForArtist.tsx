import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme
} from "@material-ui/core/styles";
import {
  CardContent,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem,
  Button
} from "@material-ui/core";
import Rider_TypeService from "../../service/rider_types";
import RiderService from "../../service/riders";
import { useSnackbar } from "material-ui-snackbar-provider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      maxWidth: 300
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: 2
    },
    noLabel: {
      marginTop: theme.spacing(3)
    },
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 200
      }
    }
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(rider: string, riderName: string[], theme: Theme) {
  return {
    fontWeight:
      riderName.indexOf(rider) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

interface EditRiderForArtist{
  match: any
  artistName: string
}

export default function EditRidersForArtist(props: EditRiderForArtist) {
  const classes = useStyles();
  const theme = useTheme();
  const selectedRiders: string[] = [];
  const snackBar = useSnackbar();

  const [riderName, setRiderName] = useState<string[]>([]);
  const [addition, setAddition] = useState("");
  const [riderTypes, setRiderTypes] = useState<
    Array<{ id: number; description: string }>
  >([]);
  const [riders, setRiders] = useState<
    Array<{
      additions: string;
      rider_typeID: number;
      eventID: number;
      userID: number;
    }>
  >([]);

  useEffect(() => {
    Rider_TypeService.getRider_Types().then((resRiderTypes: any) => {
      setRiderTypes(resRiderTypes);
      RiderService.getRidersForArtist(
        props.match.params.eventID,
        props.match.params.userID
      ).then((resRiders: any) => {
        setRiders(resRiders);
        resRiders.map((rider: any) => {
          if (rider.rider_typeID === 1) {
            setAddition(rider.additions);
          } else {
            let temp: any = resRiderTypes.find(
              (riderType: any) => riderType.id === rider.rider_typeID
            );
            if (temp !== undefined) {
              selectedRiders.push(temp.description);
            }
          }
          return null;
        });
        setRiderName(selectedRiders);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeRider = (event: React.ChangeEvent<{ value: any }>) => {
    setRiderName(event.target.value as string[]);
    let ridersArray: any = riders.filter(
      (rider: any) => rider.rider_typeID === 1
    );

    event.target.value.map((rider: any) => {
      let riderType = riderTypes.find(
        (rType: any) => rType.description === rider
      );
      if (riderType !== undefined) {
        let riderTypeID = riderType.id;
        ridersArray.push({
          additions: "",
          rider_typeID: riderTypeID,
          eventID: parseInt(props.match.params.eventID),
          userID: parseInt(props.match.params.userID)
        });
      }
      return null;
    });
    setRiders(ridersArray);
  };

  const handleChangeAddition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddition(event.target.value);
    let ridersArray: any = riders.filter(
      (rider: any) => rider.rider_typeID !== 1
    );
    ridersArray.push({
      eventID: parseInt(props.match.params.eventID),
      rider_typeID: 1,
      userID: parseInt(props.match.params.userID),
      additions: event.target.value
    });
    setRiders(ridersArray);
  };

  const handleClickSave = () => {
    RiderService.deleteRidersForArtist(
      props.match.params.eventID,
      props.match.params.userID
    ).then(() => {
      riders.map(rider => RiderService.postRider(rider));
      snackBar.showMessage("Successfully updated riders");
      setTimeout(() => {
        window.location.hash = "#/event/" + props.match.params.eventID;
      }, 400);
    });
  };

  const handleClickCancel = () => {
    window.location.hash = "#/event/" + props.match.params.eventID;
  };

  return (
    <Card
      style={{
        width: "80%",
        minHeight: "200px",
        maxHeight: "500px",
        marginTop: "100px",
        marginBottom: "20px"
      }}
    >
      <CardContent>
        <Grid container spacing={2} direction="row">
          <Grid item xs={12} md={3} style={{ margin: "5px" }}>
            <Typography variant="h6" gutterBottom>
              {props.artistName}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-chip-label">Riders</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={riderName}
                onChange={handleChangeRider}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {(selected as string[]).map((value, i) => (
                      <Chip key={i} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {riderTypes.map((rider: any, i: number) => (
                  <MenuItem
                    key={i}
                    value={rider.description}
                    style={getStyles(rider.description, riderName, theme)}
                  >
                    {rider.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="standard-multiline-flexible"
                label="Additions"
                multiline
                rowsMax="4"
                value={addition}
                onChange={handleChangeAddition}
              />
            </form>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          style={{ marginTop: "40px" }}
        >
          <Grid item xs={6} md={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClickSave}
              style={{ fontSize: "1.1vw" }}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClickCancel}
              style={{ fontSize: "1.1vw" }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
