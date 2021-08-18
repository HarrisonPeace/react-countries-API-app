import React from "react";
import { useHistory } from "react-router-dom";

// Component Imports
import CustomSelect from "./custom-select";
const queryString = require("query-string");

function PerPage({ query }) {
  //Create history reference
  let history = useHistory();

  const setItemsPerPage = (ItemsPerPage) => {
    query.perPage = ItemsPerPage; //set how many items to show per page
    query.page = 1; //set current page to 1 / otherwise user could be sent to a page that doesn't exist
    history.push({
      //push new items per page to be set on next update
      pathname: "/",
      search: queryString.stringify(query),
    });
  };

  const selectOptions = {
    //create custom select options
    id: "per-page",
    placeholder: "Items per page",
    options: ["12", "24", "48"],
  };

  return (
    <CustomSelect
      selectOptions={selectOptions}
      selectedAction={setItemsPerPage}
    /> //create custom select
  );
}

export default PerPage;
