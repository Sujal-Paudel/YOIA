import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";

import SearchIcon from "@material-ui/icons/Search";

import styles from "./index.styles";

const useStyles = makeStyles(styles);
const FilterFunction = (props) => {
  const { handleChange, filter, tableHead } = props;
  const classes = useStyles();
  return (
    <div className={classes.filter}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={handleChange}
          inputProps={{
            "aria-label": "search",
            name: "input",
            value: filter.input,
          }}
        />
      </div>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="Filter-Option">Sort By:</InputLabel>
        <NativeSelect
          id="Filter-Option"
          onChange={handleChange}
          inputProps={{
            "aria-label": "filter Option",
            name: "key",
            value: filter.key,
          }}
        >
          {tableHead.map((key, i) => (
            <option key={i} value={key}>
              {key}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default FilterFunction;
