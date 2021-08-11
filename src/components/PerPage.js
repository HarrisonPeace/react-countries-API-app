import React from "react";
import { useHistory } from "react-router-dom";

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

  return (
    <div className="custom-select">
      <select onChange={(e) => setItemsPerPage(e.target.options[e.target.selectedIndex].value)}>
        <option hidden>
          Items Per Page
        </option>
        <option value="25">
          25
        </option>
        <option  value="50">
          50
        </option>
        <option  value="100">
          100
        </option>
      </select>
    </div>
  );
}

export default PerPage;
