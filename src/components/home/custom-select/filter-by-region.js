import React from "react";
import { useHistory } from "react-router-dom";

// Component Imports
import CustomSelect from "./custom-select";
const queryString = require("query-string");

function FilterByRegion({ query }) {
  //Create history reference
  let history = useHistory();

  const selectRegion = (region) => {
    query.search = ""; //on selecting a region remove any search terms to avoid returning zero results

    if (region === "Show All") {
      //send user to home page
      query.region = "";
      history.push({
        path: "/",
        search: queryString.stringify(query),
      });
    } else {
      query.region = region.toLowerCase(); //add region to query string to be filtered out on next update
      history.push({
        path: "/",
        search: queryString.stringify(query),
      });
    }
  };

  const selectOptions = {
    //create custom select options
    id: "filter-by-region",
    placeholder: "Filter by region",
    options: ["Africa", "America", "Asia", "Europe", "Oceania", "Show All"],
  };

  return (
    <CustomSelect selectOptions={selectOptions} selectedAction={selectRegion} /> //create custom select
  );
}

export default FilterByRegion;
