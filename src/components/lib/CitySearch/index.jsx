import React, {useState, useEffect} from "react";
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {createFilterOptions} from "@material-ui/lab/Autocomplete";
import useDebounce from "helpers/use-debounce";
import {useStyles} from "./styles";
import {seachFieldTitle} from "./constants";
import {getCityAutocomplete} from "services";
import {defaultCity} from "constants/city";

function CitySearch(props) {
  const classes = useStyles();
  const [searchString, setSearchString] = React.useState("");
  const [cityAutocomplete, setCityAutocomplete] = React.useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchString = useDebounce(searchString, 500);

  useEffect(() => {
    if (debouncedSearchString) {
      setIsSearching(true);
      async function fetchData() {
        const results = await getCityAutocomplete(debouncedSearchString);
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
    const {
      inputProps: {onChange},
    } = params;
    const changeHandler = (e) => {
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
      onChange={(e, v) => {
        const {LocalizedName = defaultCity.LocalizedName, Key = defaultCity.Key} = v ? v : {};
        props.onChoose({LocalizedName, Key});
      }}
      loading={isSearching}
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
