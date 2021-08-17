import React from 'react';
import {
  useHistory
} from "react-router-dom";

import CustomSelect from "./custom-select";

const queryString = require("query-string");

function FilterByRegion({ query }) {
    //Create history reference
    let history = useHistory();

    const selectRegion = (region) => {
      query.search = ""
      if(region === "Show All") {
        query.region = ""
        history.push({
          path: '/',
          search: queryString.stringify(query),
        })
      }
      else {
        query.region = region.toLowerCase()
        history.push({
          path: '/',
          search: queryString.stringify(query),
        })
      }
    }

  const selectOptions = {
    id: "filter-by-region",
    placeholder: 'Filter by region',
    options: ['Africa', 'America', 'Asia', 'Europe', 'Oceania', 'Show All']
  }

  return (
    <CustomSelect selectOptions={selectOptions} selectedAction={selectRegion}/>
    );
}
  
export default FilterByRegion;