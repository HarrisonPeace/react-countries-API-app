import React, { useState, useEffect } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";

import PerPage from "./PerPage";
import SearchFrom from "./SearchForm";
import Pages from "./Pages";
import FilterByRegion from './FilterByRegion'

const queryString = require("query-string");

//Index Component
const Index = ({ data }) => {
  //Create history reference
  let history = useHistory();
  let location = useLocation();

  const parsed = queryString.parse(location.search);
  parsed.perPage = parseInt(parsed.perPage, { parseNumbers: true });
  parsed.page = parseInt(parsed.page);
  let { perPage, page, search } = parsed;

  if (perPage < 25) perPage = 25;
  if (perPage > 25 && perPage < 50) perPage = 50;
  if ((perPage > 50 && perPage < 100) || perPage > 100) perPage = 100;

  const [resultsPP, setResultsPP] = useState(perPage || 25); //set results per page
  const [currentPage, setCurrentPage] = useState(page || 0); //set current per page

  let startSlice = currentPage * resultsPP;
  let endSlice = (currentPage + 1) * resultsPP;
  let filteredData;
  let pages;

  if (search) {
    filteredData = data
      .filter((country) => country.name.toLowerCase().includes(search))
      .slice(startSlice, endSlice);
    pages = filteredData.length / resultsPP;
  } else {
    filteredData = data.slice(startSlice, endSlice);
    pages = data.length / resultsPP;
  }

  return (
    <main>
        <SearchFrom perPage={perPage || 25} />
        <div id="options-bar">
        <PerPage
          setResultsPP={setResultsPP}
          search={search}
          setCurrentPage={setCurrentPage}
        />
        <FilterByRegion/>
      </div>
      {filteredData.map((country) => (
        <Link key={country.name} to={`/${country.name.toLowerCase()}`}>
          <div className="country-container">
            <img src={country.flag} alt={`${country.name}'s Flag`} />
            <div className="text-container">
              <h1>{country.name}</h1>
              <span><span>Population:</span> {country.population}</span>
              <span><span>Region:</span> {country.region}</span>
              <span><span>Capital:</span> {country.capital}</span>
            </div>
          </div>
        </Link>
      ))}
      <Pages
        pages={pages}
        resultsPP={resultsPP}
        search={search}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
};

export default Index;
