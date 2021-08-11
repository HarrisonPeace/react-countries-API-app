import React from 'react';
import {
  useHistory,
} from "react-router-dom";

function Pages({ pages, resultsPP, search, setCurrentPage }) {
  //Create history reference
  let history = useHistory();

  const changePage = (page) => {
    page = page.replace('page-', '');
    setCurrentPage(parseFloat(page));
    history.push(`/?perPage=${resultsPP}&page=${page}${search ? `&search=` + search : ""}`); //Update current URL to reflect page selected
  }
  
  var buttons = [];
  for (var i = 1; i <= pages; i++) {
    buttons.push(<button id={`page-${i - 1}`} onClick={(e) => changePage(e.target.id)} key={`page-${i - 1}`}>{`Page ${i}`}</button>);
}

    return ( 
        <div>
          {buttons}
        </div>
    );
}
  
export default Pages;