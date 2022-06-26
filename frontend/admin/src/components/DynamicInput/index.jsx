import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

import { useSelector } from "react-redux";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid black",
    fontSize: 16,
    width: theme.spacing(10),
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles(() => ({
  chipLabel: {
    marginRight: 16,
  },
}));

function DynamicImport({ items, onInputEntry, onEntryDelete, name }) {
  const { itemsData } = useSelector((state) => state);
  const itemCodes = React.useMemo(
    () =>
      Object.values(itemsData)
        .filter((item) => item.itemCode !== "")
        .map((item) => item.itemCode)
        .filter((temp) => !items.includes(temp)),
    [itemsData, items]
  );
  const [value, setValue] = useState();
  const classes = useStyles();

  React.useEffect(() => {
    setValue(itemCodes[0]);
  }, [itemCodes]);

  return (
    <div>
      <FormControl>
        <InputLabel htmlFor={`options-list-${name}`}>{name}</InputLabel>
        <NativeSelect
          id={`options-list-${name}`}
          onChange={(e) => setValue(e.currentTarget.value)}
          name={name}
          input={<BootstrapInput />}
        >
          {itemCodes.map((code, i) => (
            <option aria-label={`Option ${code}}`} key={i} value={code}>
              {code}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
      <Button
        variant="outlined"
        style={{ marginTop: 20, marginLeft: 16, padding: "10px 24px" }}
        onClick={() => {
          onInputEntry(name, value.trim());
        }}
      >
        Add
      </Button>
      <br />
      <div style={{ marginTop: 24 }}>
        {items.map((one) => (
          <Chip
            key={one}
            style={{ margin: 8 }}
            label={one}
            onDelete={() => {
              onEntryDelete(name, one);
            }}
            color="secondary"
            classes={{ label: classes.chipLabel }}
          />
        ))}
      </div>
    </div>
  );
}

export default DynamicImport;
