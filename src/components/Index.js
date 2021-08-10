import React, { useState, useEffect } from "react";
import {
  useHistory,
  useLocation
} from "react-router-dom";

import SearchFrom from './SearchForm'
import Pages from './Pages'

const queryString = require('query-string');

//Index Component
const Index = ({ data }) => {

  //Create history reference
  let history = useHistory();
  let location = useLocation();

  const parsed = queryString.parse(location.search);
  parsed.perPage = parseFloat(parsed.perPage, {parseNumbers: true})
  parsed.page = parseFloat(parsed.page)
  let {perPage, page, search } = parsed;

  const [resultsPP, setResultsPP] = useState(perPage || 25) //set results per page
  const [currentPage, setCurrentPage] = useState(page || 0) //set current per page

  let startSlice = currentPage * resultsPP;
  let endSlice = ((currentPage + 1) * resultsPP);
  let filteredData;
  let pages;

  if(search) {
    filteredData = data.filter(country => country.name.toLowerCase().includes(search)).slice(startSlice, endSlice);
    pages = filteredData.length / resultsPP
  } else {
    filteredData = data.slice(startSlice, endSlice);
    pages = data.length / resultsPP
  }

  return (
    <main>
    <SearchFrom perPage={perPage || 25}/>
      {
        filteredData.map(country => 
        <div key={country.name}>
          <img src={country.flag} alt={`${country.name}'s Flag`}/>
          <h1>{country.name}</h1>
          <h2>Population: {country.population}</h2>
          <h2>Region: {country.region}</h2>
          <h2>Capital: {country.capital}</h2>
        </div>
        )}
        <Pages  pages={pages} resultsPP={resultsPP} search={search} setCurrentPage={setCurrentPage}/>
    </main>
  );
};

export default Index;