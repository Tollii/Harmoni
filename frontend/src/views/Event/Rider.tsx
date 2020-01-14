import React from "react";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme
} from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Card from "../../components/Card/Card";
import { CardContent, TextField, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import RiderTypeService from "../../service/rider_types";

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

let riders: Array<{ id: number; description: string }> = [];
RiderTypeService.getRider_Types().then((response: any) => {
  riders = response;
});

export default function(props: any) {
  return (
    <div>
      {props.values.artists.map((artist: any) => (
        <RiderCard artistName={artist.name} />
      ))}
    </div>
  );
}

function getStyles(rider: string, riderName: string[], theme: Theme) {
  return {
    fontWeight:
      riderName.indexOf(rider) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

function RiderCard(props: any) {
  const classes = useStyles();
  const theme = useTheme();

  const [riderName, setRiderName] = React.useState<string[]>([]);
  const [addition, setAddition] = React.useState("");

  const handleChangeRider = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRiderName(event.target.value as string[]);
  };

  const handleChangeAddition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddition(event.target.value);
  };

  return (
    <Card style={{ width: "80%", marginBottom: "20px" }}>
      <CardContent>
        <Grid container spacing={2} direction="row">
          <Grid item xs={3} style={{ margin: "5px" }}>
            <Typography variant="h6" gutterBottom>
              {props.artistName}
            </Typography>
          </Grid>
          <Grid item xs={4}>
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
                    {(selected as string[]).map(value => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {riders.map((rider, i) => (
                  <MenuItem
                    key={i}
                    value={rider.description}
                    style={getStyles(rider.description, riderName, theme)}
                  >
                    {rider}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
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
      </CardContent>
    </Card>
  );
}
