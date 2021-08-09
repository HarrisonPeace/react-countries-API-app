import React, { useState, useEffect } from "react";
import {
  useHistory,
  useParams
} from "react-router-dom";

//Header Component
const Index = ({ data }) => {

  //Create history reference
  let history = useHistory();

  let { perPage, page } = useParams();

  const [resultsPP, setResultsPP] = useState(25) //set results per page
  const [currentPage, setCurrentPage] = useState(0) //set current per page

  let startSlice = currentPage * resultsPP;
  let endSlice = ((currentPage + 1) * resultsPP);
  let filteredData = data.slice(startSlice, endSlice);

  return (
    <main>
      {
        filteredData.map(country => 
        <div>
          <img src={country.flag} alt={`${country.name}'s Flag`}/>
          <h1>{country.name}</h1>
          <h2>Population: {country.population}</h2>
          <h2>Region: {country.region}</h2>
          <h2>Capital: {country.capital}</h2>
        </div>
        )}
    </main>
  );
};

export default Index;