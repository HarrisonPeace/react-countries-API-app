import React from "react";
import { useHistory } from "react-router-dom";

import CustomSelect from "./custom-select";

const queryString = require("query-string");

function PerPage({ query }) {
  //Create history reference
  let history = useHistory();

  const setItemsPerPage = (ItemsPerPage) => {
    query.perPage = ItemsPerPage;
    query.page = 1;
    history.push({
      pathname: '/',
      search: queryString.stringify(query),
    })
  };

  const selectOptions = {
    id: "per-page",
    placeholder: 'Items per page',
    options: ['12', '24', '48']
  }

  return (
    <CustomSelect selectOptions={selectOptions} selectedAction={setItemsPerPage}/>
  );
}

export default PerPage;