import React, {useState, useEffect, useCallback} from "react";
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {createFilterOptions} from "@material-ui/lab/Autocomplete";
import debounce from "lodash.debounce";
import useDebounce from "helpers/use-debounce";
import {useStyles} from "./styles";
import {seachFieldTitle} from "./constants";
import {getCityAutocomplete} from "services";

function CitySearch() {
  const classes = useStyles();
  const [searchString, setSearchString] = React.useState("");
  const [cityAutocomplete, setCityAutocomplete] = React.useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchString = useDebounce(searchString, 500);

  useEffect(() => {
    if (debouncedSearchString) {
      setIsSearching(true);
      async function fetchData() {
        const results = await getCityAutocomplete(searchString);
        setIsSearching(false);
        results ? setCityAutocomplete(results) : setCityAutocomplete([]);
      }
      fetchData();
    } else {
      setCityAutocomplete([]);
    }
  }, [debouncedSearchString]);
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.LocalizedName,
  });

  const renderInput = (params) => {
    console.log("params", params);
    const {
      inputProps: {onChange},
    } = params;
    const changeHandler = (e) => {
      console.log("changeHandler fired with: ", e.target.value);
      setSearchString(e.target.value);
      onChange(e);
    };
    params.inputProps.onChange = changeHandler;
    params.inputProps.value = searchString;
    return <TextField className={classes.textField} {...params} label={seachFieldTitle} variant="outlined" fullWidth />;
  };

  return (
    <Autocomplete
      options={cityAutocomplete}
      // options={cityAutocomplete.default}
      getOptionLabel={(option) => option.LocalizedName}
      style={{width: 300}}
      clearOnEscape
      autoSelect
      filterOptions={filterOptions}
      renderInput={renderInput}
    />
  );
}

export default CitySearch;
