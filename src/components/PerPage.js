import React from "react";
import { useHistory } from "react-router-dom";

import CustomSelect from "./CustomSelect";

function PerPage({ setResultsPP, search, setCurrentPage }) {
  //Create history reference
  let history = useHistory();

  const setItemsPerPage = (ItemsPerPage) => {
    setResultsPP(ItemsPerPage);
    setCurrentPage(0);
    history.push(
      `/?perPage=${ItemsPerPage}&page=0${search ? `&search=` + search : ""}`
    ); //Update current URL to reflect page selected
  };

  const selectOptions = {
    id: "per-page",
    placeholder: 'Items per page',
    options: ['10', '25', '50', '100']
  }

  return (
    <CustomSelect selectOptions={selectOptions} selectedAction={setItemsPerPage}/>
  );
}

export default PerPage;
